import { useAppDispatch, useAppSelector } from '@/utilities/redux/store';
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ItemUser from './ItemUser';
import UserBadgeItem from './UserBadgeItem';
import { createGroupChat } from '@/utilities/services';
import { typeToast } from '@/utilities/functions';
import { HttpStatusCode } from 'axios';
import { setChats } from '@/utilities/redux/slices/app.slice';
import { InView } from 'react-intersection-observer';
import useUsers from '@/utilities/hooks/useUsers';
import ScrollableFeed from 'react-scrollable-feed';

interface GroupChatModalProps {
  children: React.ReactNode;
}

const GroupChatModal = (props: GroupChatModalProps) => {
  const { children } = props;
  const toast = useToast();
  const { chats } = useAppSelector((state) => state.app);
  const { info } = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [newGroupChat, setNewGroupChat] = useState<GroupChat>({
    chatName: '',
    receiveIds: [],
    senderId: '',
  });
  const [isFetchMore, setIsFetchMore] = useState<boolean>(false);
  const { users, isLoading: isLoadingUsers } = useUsers(isFetchMore);

  const handleSubmit = useCallback(async () => {
    if (!info) return;

    toast.closeAll();
    if (!newGroupChat.chatName) {
      toast({
        title: 'Invalid Info',
        description: 'Group chat name is null',
        status: 'error',
        isClosable: true,
        position: 'top-left',
        duration: 4000,
      });
      return;
    }
    if (newGroupChat.receiveIds?.length < 1) {
      toast({
        title: 'Invalid Info',
        description: 'Group chat members are null',
        status: 'error',
        isClosable: true,
        position: 'top-left',
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);
    const response = await createGroupChat({
      ...newGroupChat,
      senderId: info._id,
    });
    setIsLoading(false);
    toast({
      description: response.message,
      status: typeToast(response.statusCode),
      position: 'top-left',
      isClosable: true,
      duration: 4000,
    });

    if (response.statusCode === HttpStatusCode.Created) {
      onClose();
      dispatch(setChats([...chats, response.data]));
      setNewGroupChat({
        chatName: '',
        receiveIds: [],
        senderId: '',
      });
    }
  }, [newGroupChat]);

  const handleAddUser = async (item: User) => {
    setNewGroupChat((state) => ({
      ...state,
      receiveIds: [...state.receiveIds, item._id],
    }));
  };

  const handleSearch = useCallback(() => {
    if (users?.length > 0)
      setFilteredUsers(
        users.filter((item) => {
          if (
            item.username.includes(searchText) ||
            item.email.includes(searchText)
          ) {
            return item;
          }
        })
      );
  }, [searchText, users]);

  const handleDeleteUser = (id: string) => {
    setNewGroupChat((state) => ({
      ...state,
      receiveIds: newGroupChat?.receiveIds.splice(
        newGroupChat?.receiveIds.findIndex((item) => item === id),
        1
      ),
    }));
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={newGroupChat?.chatName}
                onChange={(event) =>
                  setNewGroupChat((state) => ({
                    ...state,
                    chatName: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(event) => setSearchText(event.target.value)}
                value={searchText}
              />
            </FormControl>
            <InView
              onChange={(inView, entry) => {
                setIsFetchMore(inView);
              }}
              // Các config của intersection-observer đều là props của Inview
            >
              {({ inView, ref, entry }) => (
                <ScrollableFeed>
                  <Box
                    w="100%"
                    display="flex"
                    flexWrap="wrap"
                    overflowY={'scroll'}
                    maxHeight={'50vh'}
                  >
                    {newGroupChat?.receiveIds?.length > 0 &&
                      newGroupChat.receiveIds.map((item) => {
                        if (filteredUsers?.length < 1 && users?.length < 1)
                          return;
                        const data = users.find((user) => user._id === item);
                        if (data)
                          return (
                            <UserBadgeItem
                              key={data?._id}
                              data={data}
                              onClick={() => handleDeleteUser(item)}
                            />
                          );
                      })}
                    {searchText
                      ? filteredUsers?.length > 0 &&
                        filteredUsers.map((item, index) => (
                          <Box
                            ref={index === users.length - 3 ? ref : null}
                            key={item._id}
                            w="100%"
                          >
                            <ItemUser
                              data={item}
                              onClick={() => handleAddUser(item)}
                              selectedUserIds={newGroupChat?.receiveIds}
                            />
                          </Box>
                        ))
                      : users?.length > 0 &&
                        users.map((item, index) => (
                          <Box
                            ref={index === users.length - 3 ? ref : null}
                            key={item._id}
                            w="100%"
                          >
                            <ItemUser
                              data={item}
                              onClick={() => handleAddUser(item)}
                              selectedUserIds={newGroupChat?.receiveIds}
                            />
                          </Box>
                        ))}
                    {isLoadingUsers && (
                      <Spinner
                        m="auto"
                        display="flex"
                      />
                    )}
                  </Box>
                </ScrollableFeed>
              )}
            </InView>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSubmit}
              colorScheme="blue"
              isLoading={isLoading}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
