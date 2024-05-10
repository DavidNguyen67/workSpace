import { getReceive, typeToast } from '@/utilities/functions';
import { setCurrentChat } from '@/utilities/redux/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@/utilities/redux/store';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ProfileComponent from './profile/Profile';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import { getMessages, sendMessage } from '@/utilities/services';
import { HttpStatusCode } from 'axios';
import ScrollableChat from './ScrollableChat';
import useSocket from '@/utilities/hooks/useSocket';
import { USER_CONSTANTS } from '@/utilities/constants';
import Lottie from 'react-lottie';
import animationData from '../animations/typing.json';

interface SingleChatProps {}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const SingleChat = (props: SingleChatProps) => {
  const { currentChat, info } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [newMessageText, setNewMessageText] = useState<string>('');
  const [messages, setMessages] = useState<MessageSentResponse[]>([]);
  const { socket, isConnected } = useSocket();

  const handleGetMessages = useCallback(async () => {
    if (currentChat?._id) {
      setIsLoading(true);
      const response = await getMessages({
        chatId: currentChat?._id,
      });
      setIsLoading(false);
      if (response.statusCode === HttpStatusCode.Ok) {
        setMessages(response.data);
      }
    }
  }, [getMessages, currentChat]);

  const handleTyping = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      socket?.emit(USER_CONSTANTS.ACTION.WS.TYPING, currentChat?._id);
      setNewMessageText(event.target.value);
    },
    [socket, currentChat]
  );

  const handleKeyDown = useCallback(
    async (event: any) => {
      if (event.keyCode === 13 || event.which === 13) {
        socket?.emit(USER_CONSTANTS.ACTION.WS.STOP_TYPING, currentChat?._id);
        setIsLoading(true);
        const response = await sendMessage({
          chatId: currentChat?._id,
          senderId: info?._id,
          content: newMessageText,
        });
        setIsLoading(false);
        // Nếu gửi fail
        if (response.statusCode !== HttpStatusCode.Created) {
          toast({
            description: response.message,
            status: typeToast(response.statusCode),
            isClosable: true,
            position: 'top-left',
            duration: 4000,
          });
          socket?.emit(USER_CONSTANTS.ACTION.WS.SEND_MESSAGE, {
            chatId: currentChat?._id,
            senderId: info?._id,
            content: newMessageText,
          });
          return;
        }
        const { data }: { data?: MessageSentResponse } = response;

        setNewMessageText('');
        if (data) setMessages([...messages, data]);
      }
    },
    [currentChat, messages, info, newMessageText, socket]
  );

  const handleSetupChat = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    handleGetMessages();
    setNewMessageText('');
  }, [currentChat?._id]);

  useEffect(() => {
    if (isConnected && currentChat) {
      socket?.emit(USER_CONSTANTS.ACTION.WS.JOIN_ROOM, currentChat);
      socket?.on(USER_CONSTANTS.ACTION.WS.CONNECTED, handleSetupChat);
      socket?.on(USER_CONSTANTS.ACTION.WS.TYPING, () => setIsTyping(true));
      socket?.on(USER_CONSTANTS.ACTION.WS.STOP_TYPING, () =>
        setIsTyping(false)
      );
    }

    return () => {
      if (isConnected && currentChat) {
        socket?.off(USER_CONSTANTS.ACTION.WS.CONNECTED, handleSetupChat);
        socket?.off(USER_CONSTANTS.ACTION.WS.TYPING);
        socket?.off(USER_CONSTANTS.ACTION.WS.STOP_TYPING);
      }
    };
  }, [isConnected, currentChat]);

  return (
    <>
      {currentChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              variant="outline"
              aria-label="Back"
              icon={<ArrowBackIcon />}
              onClick={() => dispatch(setCurrentChat(null))}
            />
            {info && (
              <>
                {!currentChat.isGroupChat ? (
                  <>
                    {getReceive(currentChat.users, info?._id)?.username}
                    <ProfileComponent
                      user={getReceive(currentChat.users, info?._id)}
                    />
                  </>
                ) : (
                  <>
                    {currentChat.chatName}
                    <UpdateGroupChatModal />
                  </>
                )}
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {isLoading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              id="first-name"
              isRequired
              mt={3}
              onKeyDown={handleKeyDown}
            >
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessageText}
                onChange={handleTyping}
                isDisabled={isLoading}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text
            fontSize="3xl"
            pb={3}
            fontFamily="Work sans"
          >
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
