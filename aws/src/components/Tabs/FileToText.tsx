import { Upload, Button, Space } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { Predictions } from '@aws-amplify/predictions';

const FileToText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUploadFile = useCallback((info: any) => {
    if (info.file?.status === 'done') {
      setFile(info.file.originFileObj);
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (file) {
      setIsLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        console.log(arrayBuffer);

        // const { transcription } = await Predictions.convert({
        //   transcription: {
        //     source: {
        //       bytes: uint8Array,
        //     },
        //     language: 'en-US',
        //   },
        // });
        // console.log(transcription);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [file]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
      </Space>
    </div>
  );
};

export default FileToText;
