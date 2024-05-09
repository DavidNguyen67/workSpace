import { getReceive } from '@/utilities/functions';
import { findChat, setChats } from '@/utilities/redux/slices/app.slice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/utilities/redux/store/index.store';
import { AddIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Spinner, Stack, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import GroupChatModal from './GroupChatModal';
import { setCurrentChat } from '@/utilities/redux/slices/user.slice';

interface MyChatsProps {}

const MyChats = (props: MyChatsProps) => {
  const { info, currentChat } = useAppSelector((state) => state.user);
  const { chats, isLoading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const findAllChat = useCallback(async () => {
    if (info) {
      dispatch(findChat({ senderId: info?._id }));
    }
  }, [info, findChat]);

  const handleAddGroupChat = useCallback(async () => {}, []);

  useEffect(() => {
    findAllChat();
  }, []);

  return (
    <>
      <Box
        display={{ base: true ? 'none' : 'flex', md: 'flex' }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: '100%', md: '31%' }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: '28px', md: '30px' }}
          fontFamily="Work sans"
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
          <GroupChatModal>
            <Button
              display="flex"
              fontSize={{ base: '17px', md: '10px', lg: '17px' }}
              rightIcon={<AddIcon />}
              onClick={handleAddGroupChat}
            >
              New Group Chat
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {isLoading ? (
            <Spinner
              m="auto"
              display="flex"
            />
          ) : (
            chats?.length > 0 && (
              <Stack overflowY="scroll">
                {chats.map((item) => (
                  <Box
                    bg={currentChat?._id === item._id ? '#38B2AC' : '#E8E8E8'}
                    cursor="pointer"
                    px={3}
                    py={2}
                    borderRadius="lg"
                    onClick={() =>
                      dispatch(
                        setCurrentChat(
                          currentChat?._id === item._id ? null : item
                        )
                      )
                    }
                    key={item._id}
                    display={'flex'}
                    gap={2}
                  >
                    <Avatar
                      size="xs"
                      name={getReceive(item.users, info?._id || '')?.username}
                      src={getReceive(item.users, info?._id || '')?.avatar}
                    />
                    <Text>
                      {!item.isGroupChat && info?._id
                        ? getReceive(item.users, info?._id)?.username
                        : item.chatName}
                    </Text>
                    {item.latestMessage && (
                      <Text fontSize="xs">
                        <b>{item.latestMessage.sender.username} : </b>
                        {item.latestMessage.content.length > 50
                          ? item.latestMessage.content.substring(0, 51) + '...'
                          : item.latestMessage.content}
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
            )
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
