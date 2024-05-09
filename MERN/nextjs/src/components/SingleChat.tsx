import { getReceive, typeToast } from '@/utilities/functions';
import { setCurrentChat } from '@/utilities/redux/slices/user.slice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/utilities/redux/store/index.store';
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

interface SingleChatProps {}

const SingleChat = (props: SingleChatProps) => {
  const { currentChat, info } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [newMessageText, setNewMessageText] = useState<string>('');
  const [messages, setMessages] = useState<MessageSentResponse[]>([]);

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
      setNewMessageText(event.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    async (event: any) => {
      if (event.keyCode === 13 || event.which === 13) {
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
          return;
        }
        const { data }: { data?: MessageSentResponse } = response;

        setNewMessageText('');
        if (data) setMessages([...messages, data]);
      }
    },
    [currentChat, messages, info, newMessageText]
  );

  useEffect(() => {
    handleGetMessages();
    setNewMessageText('');
  }, [currentChat?._id]);

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
