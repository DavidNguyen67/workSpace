import { getReceive } from '@/utilities/functions';
import { setCurrentChat } from '@/utilities/redux/slices/user.slice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/utilities/redux/store/index.store';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import ProfileComponent from './profile/Profile';
import UpdateGroupChatModal from './UpdateGroupChatModal';

interface SingleChatProps {}

const SingleChat = (props: SingleChatProps) => {
  const { currentChat, info } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  // const [newMessage, setNewMessage] = useState<Message>({
  //   chat: '',
  //   content: '',
  //   sender: {},
  // });

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
            <FormControl
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
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
