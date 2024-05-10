import { useAppDispatch, useAppSelector } from '@/utilities/redux/store';
import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import UserBadgeItem from './UserBadgeItem';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import ItemUser from './ItemUser';
import useSearchUsers from '@/utilities/hooks/useSearchUsers';
import { compareArrays, typeToast } from '@/utilities/functions';
import { HttpStatusCode } from 'axios';
import { findChat } from '@/utilities/redux/slices/app.slice';
import _ from 'lodash';
import { deleteGroupChat, updateUsersToGroupChat } from '@/utilities/services';
import { setCurrentChat } from '@/utilities/redux/slices/user.slice';
import PopConfirm from './PopConfirm';
import useApp from '@/utilities/hooks/useApp';

interface UpdateGroupChatModalProps {}

const UpdateGroupChatModal = (props: UpdateGroupChatModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentChat, info } = useAppSelector((state) => state.user);
  const { users } = useApp();
  const [searchText, setSearchText] = useState<string>('');
  const [isLoadingUpdating, setIsLoadingUpdating] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isLoadingDeleting, setIsLoadingDeleting] = useState<boolean>(false);
  const [groupChat, setGroupChat] = useState<GroupChat>({
    chatName: '',
    receiveIds: [],
    senderId: '',
  });
  const { filteredUsers } = useSearchUsers(
    users,
    searchText,
    groupChat.receiveIds
  );

  const handleSubmit = useCallback(async () => {
    // không thay đổi gì
    if (
      groupChat.chatName === currentChat?.chatName &&
      compareArrays(groupChat.receiveIds, currentChat.users, '_id')
    ) {
      onClose();
      return;
    }

    setIsLoadingUpdating(true);
    const response = await updateUsersToGroupChat({
      chatId: currentChat?._id,
      chatName: groupChat.chatName,
      receiveIds: groupChat.receiveIds,
    });
    setIsLoadingUpdating(false);

    handleResponse(response);
  }, [groupChat]);

  const handleRemoveUser = useCallback(
    (user: User) => {
      if (currentChat?.groupAdminId !== info?._id) {
        toast({
          title: 'Only admins can remove someone!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-left',
        });
        return;
      }
      setGroupChat({
        ...groupChat,
        receiveIds: groupChat.receiveIds.filter((id) => id !== user._id),
      });
    },
    [groupChat]
  );

  const handleAddUser = useCallback(
    (user: User) => {
      setGroupChat((state) => ({
        ...state,
        receiveIds: [...state.receiveIds, user._id],
      }));
    },
    [groupChat]
  );

  // Hàm đang còn bị lỗi
  const handleLeaveGroup = useCallback(async () => {
    if (currentChat?.groupAdminId !== info?._id) {
      toast({
        title: 'Only admins can delete group chat!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    setIsLoadingDeleting(true);
    const response = await deleteGroupChat({
      chatId: currentChat?._id,
    });
    setIsLoadingDeleting(false);
    handleResponse(response);
  }, [currentChat, info]);

  const handleResponse = useCallback(
    async (response: CommonResponse) => {
      toast({
        description: response.message,
        status: typeToast(response.statusCode),
        position: 'top-left',
        isClosable: true,
        duration: 4000,
      });

      // nếu thành công thì gọi lại api để tìm người gửi
      // đồng thời dispatch lại một lần nữa để update lại UI
      if (response.statusCode === HttpStatusCode.Ok) {
        onClose();
        dispatch(
          findChat({
            senderId: info?._id,
          })
        );
        dispatch(setCurrentChat(null));
        return;
      }
    },
    [dispatch, findChat]
  );

  useEffect(() => {
    setGroupChat({
      ...groupChat,
      chatName: currentChat?.chatName || '',
      receiveIds: currentChat?.users.map((item) => item._id ?? item) || [],
      senderId: info?._id || '',
    });
  }, [currentChat]);

  return (
    <>
      <IconButton
        display={{ base: 'flex' }}
        icon={<EditIcon />}
        onClick={onOpen}
        aria-label="update"
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {currentChat?.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Box
              w="100%"
              display="flex"
              flexWrap="wrap"
              pb={3}
            >
              {groupChat?.receiveIds?.length > 0 &&
                groupChat.receiveIds.map((item) => {
                  const user = users.find((user) => user._id === item);

                  if (user)
                    return (
                      <UserBadgeItem
                        key={item}
                        data={user}
                        adminId={groupChat.senderId}
                        onClick={() => handleRemoveUser(user)}
                      />
                    );
                })}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChat?.chatName}
                onChange={(event: { target: { value: any } }) => {
                  if (groupChat)
                    setGroupChat({
                      ...groupChat,
                      chatName: event.target.value,
                    });
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                value={searchText}
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setSearchText(event.target.value)}
              />
              {searchText ? (
                filteredUsers?.length > 0 ? (
                  filteredUsers.map((item) => {
                    if (
                      groupChat.receiveIds?.length > 0 &&
                      groupChat.receiveIds?.includes(item._id)
                    )
                      return;
                    return (
                      <ItemUser
                        key={item._id}
                        data={item}
                        onClick={() => {
                          handleAddUser(item);
                        }}
                      />
                    );
                  })
                ) : (
                  <Text
                    textAlign="center"
                    fontSize="24px"
                  >
                    Not found
                  </Text>
                )
              ) : users?.length > 0 ? (
                users.map((item) => {
                  if (
                    groupChat.receiveIds?.length > 0 &&
                    groupChat.receiveIds?.includes(item._id)
                  )
                    return;
                  return (
                    <ItemUser
                      key={item._id}
                      data={item}
                      onClick={() => {
                        handleAddUser(item);
                      }}
                    />
                  );
                })
              ) : (
                <Text
                  textAlign="center"
                  fontSize="24px"
                >
                  Not found
                </Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <PopConfirm
              buttonTriggerTitle="Delete"
              onClickConfirm={handleLeaveGroup}
              isLoadingDeleting={isLoadingDeleting}
            />
            <Button
              variant="solid"
              colorScheme="teal"
              ml={1}
              isLoading={isLoadingUpdating}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
