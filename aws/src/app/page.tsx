'use client';

import ChatBot from '@/components/ChatBot/ChatBot';
import FileToText from '@/components/Tabs/FileToText';
import SpeechToText from '@/components/Tabs/SpeechToText';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'SpeechToText',
    children: <SpeechToText />,
  },
  {
    key: '2',
    label: 'FileToText',
    children: <FileToText />,
  },
  {
    key: '3',
    label: 'ChatBot',
    children: <ChatBot />,
  },
];

const Home = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
    />
  );
};

export default Home;
