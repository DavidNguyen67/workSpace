import React, { useState, useCallback, useMemo } from 'react';
import {
  Button,
  Card,
  Typography,
  Layout,
  Space,
  Row,
  Col,
  Progress,
  Spin,
  notification,
} from 'antd';
import MicrophoneStream from 'microphone-stream';
import { getBuffer } from '@/utilities/helpers/getBuffer';
import { Predictions } from '@aws-amplify/predictions';
import { AudioOutlined, StopOutlined } from '@ant-design/icons';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

interface AudioRecorderProps {
  finishRecording: (data: Uint8Array) => void;
  isLoading: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  finishRecording,
  isLoading,
}) => {
  const [recording, setRecording] = useState(false);
  const [micStream, setMicStream] = useState<MicrophoneStream | null>(null);
  const audioBuffer = useMemo(() => getBuffer(), []);

  const startRecording = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const startMic = new MicrophoneStream();
    startMic.setStream(stream);
    startMic.on('data', (chunk) => {
      const raw = MicrophoneStream.toRaw(chunk);
      if (raw == null) {
        return;
      }
      audioBuffer.addData(raw);
    });

    setRecording(true);
    setMicStream(startMic);
  }, [audioBuffer]);

  const stopRecording = useCallback(async () => {
    if (micStream) {
      micStream.stop();
      setMicStream(null);
      setRecording(false);

      const resultBuffer = audioBuffer.getData();
      finishRecording(resultBuffer);
    }
  }, [micStream, audioBuffer, finishRecording]);

  return (
    <Space
      direction="horizontal"
      align="center"
    >
      {isLoading ? (
        <Spin />
      ) : (
        <>
          {!recording ? (
            <Button
              disabled={recording}
              type="primary"
              icon={<AudioOutlined />}
              onClick={startRecording}
              style={{
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
                marginRight: '8px',
              }}
            >
              Start Recording
            </Button>
          ) : (
            <Button
              disabled={!recording}
              type="primary"
              icon={<StopOutlined />}
              onClick={stopRecording}
              style={{
                backgroundColor: '#f5222d',
                borderColor: '#f5222d',
                marginRight: '8px',
              }}
            >
              Stop Recording
            </Button>
          )}
        </>
      )}
    </Space>
  );
};

const SpeechToText: React.FC = () => {
  const [response, setResponse] = useState('');
  const [sentiment, setSentiment] = useState<
    'positive' | 'negative' | 'neutral' | 'mixed'
  >('neutral');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sentimentScore, setSentimentScore] = useState(0);
  const [audioBuffer, setAudioBuffer] = useState<ArrayBuffer | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const finishRecording = async (pcmData: Uint8Array) => {
    try {
      setAudioBuffer(null);
      setIsLoading(true);

      const { transcription } = await Predictions.convert({
        transcription: {
          source: {
            bytes: pcmData,
          },
          language: 'en-US',
        },
      });

      const fullText = transcription.fullText;
      setResponse(fullText);

      const { textInterpretation } = await Predictions.interpret({
        text: {
          source: {
            text: fullText,
          },
          type: 'all',
        },
      });

      const predominant = textInterpretation.sentiment?.predominant;
      const score =
        textInterpretation.sentiment?.[
          predominant && predominant?.toLocaleLowerCase()
        ] ?? 50;
      setSentimentScore(score);

      setSentiment(
        predominant?.toLowerCase() as
          | 'positive'
          | 'negative'
          | 'neutral'
          | 'mixed'
      );
    } catch (error: any) {
      api.error({ message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = useCallback(() => {
    switch (sentiment) {
      case 'positive':
        return '#52c41a';
      case 'negative':
        return '#ff4d4f';
      case 'neutral':
        return '#faad14';
      default:
        return '#d9d9d9';
    }
  }, [sentiment]);

  const handleTextToSpeech = useCallback(async () => {
    const { audioStream } = await Predictions.convert({
      textToSpeech: {
        source: {
          text: response,
        },
        voiceId: 'Amy',
      },
    });
    setAudioBuffer(audioStream);
  }, [response]);

  return (
    <Layout>
      {contextHolder}
      <Row
        justify="center"
        style={{ marginBottom: '24px' }}
      >
        <Col>
          <AudioRecorder
            finishRecording={finishRecording}
            isLoading={isLoading}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col
          xs={24}
          md={16}
          lg={8}
        >
          <Card title="Transcription">
            <Typography.Paragraph>{response}</Typography.Paragraph>
          </Card>
        </Col>
      </Row>
      {response && (
        <Row
          justify="center"
          style={{ marginTop: '24px' }}
        >
          <Space>
            <Button
              type="primary"
              icon={<AudioOutlined />}
              onClick={handleTextToSpeech}
            >
              Text to Speech
            </Button>
          </Space>
        </Row>
      )}
      <Row
        justify="center"
        style={{ marginTop: '24px' }}
      >
        <Progress
          type="circle"
          percent={sentimentScore * 100}
          format={() => sentiment.toUpperCase()}
          strokeColor={getSentimentColor()}
        />
      </Row>
      {audioBuffer && (
        <Space align="center">
          <AudioPlayer audioBuffer={audioBuffer} />
        </Space>
      )}
    </Layout>
  );
};

export default SpeechToText;
