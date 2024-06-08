import { Upload, Button, Space, notification } from 'antd';
import {
  UploadOutlined,
  SendOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { Predictions } from '@aws-amplify/predictions';

const FileToText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [s3Uri, setS3Uri] = useState<string>('');

  const handleUploadFile = useCallback((info: any) => {
    if (info.file?.status === 'done') {
      setFile(info.file.originFileObj);
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (file) {
      setIsLoading(true);
      try {
        const result = await uploadData({
          path: file.name,
          data: file,
          options: {
            contentType: file.type,
          },
        }).result;
        api.success({
          message: 'Upload success',
        });

        setS3Uri(result.path);
      } catch (error: any) {
        console.log(error.message);

        api.error({ message: error.message });
      } finally {
        setIsLoading(false);
      }
    }
  }, [api, file]);

  const handleTranscribe = useCallback(async () => {
    setIsLoading(true);
    try {
      const { transcription } = await Predictions.convert({
        transcription: {
          source: {
            key: s3Uri,
          },
          language: 'en-US',
        },
      });
      console.log(transcription);

      api.success({ message: 'Transcription successful' });
    } catch (error: any) {
      console.error('Error transcribing audio:', error);
      api.error({ message: 'Transcription failed' });
    } finally {
      setIsLoading(false);
    }
  }, [api, s3Uri]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {contextHolder}
      <Space
        direction="vertical"
        align="center"
      >
        <Upload
          onChange={handleUploadFile}
          accept="audio/*"
        >
          <Button icon={<UploadOutlined />}>Upload Audio File</Button>
        </Upload>
        <Button
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={isLoading}
          style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
        >
          Send
        </Button>
        {s3Uri && (
          <Button
            icon={<FileTextOutlined />}
            onClick={handleTranscribe}
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          >
            Transcribe
          </Button>
        )}
      </Space>
    </div>
  );
};

export default FileToText;
