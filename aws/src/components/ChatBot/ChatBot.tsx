'use client';

import { useState, useCallback } from 'react';
import { Input, Button, List, Card } from 'antd';
import { sendMessage } from '@/utilities/services/openAi';
import styles from './ChatBot.module.css'; // Assuming you have a CSS module for styling

const { TextArea } = Input;

const ChatBot = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = useCallback(async () => {
    if (!inputValue) return;

    const response = await sendMessage(inputValue);
    console.log(response);

    setInputValue('');
  }, [inputValue]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.inputContainer}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type a message..."
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;
