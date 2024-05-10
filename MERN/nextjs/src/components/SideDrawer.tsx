'use client';
import { useAppDispatch, useAppSelector } from '@/utilities/redux/store';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ProfileComponent from './profile/Profile';
import {
  revertUser,
  setChat,
  setCurrentChat,
} from '@/utilities/redux/slices/user.slice';
import { findOrCreateChat } from '@/utilities/services';
import ItemUser from './ItemUser';
import { HttpStatusCode } from 'axios';
import { findChat } from '@/utilities/redux/slices/app.slice';
import { typeToast } from '@/utilities/functions';
import useSearchUsers from '@/utilities/hooks/useSearchUsers';
import useUsers from '@/utilities/hooks/useUsers';

function SideDrawer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { info } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState<string>('');
  const toast = useToast();
  const [isFetchMore, setIsFetchMore] = useState<boolean>(false);
  const { users, isLoading: isLoadingUsers } = useUsers(isFetchMore);
  const { filteredUsers } = useSearchUsers(users, searchText);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleLogout = useCallback(() => {
    dispatch(revertUser());
    toast({
      title: 'Logout success fully',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-left',
    });
  }, [dispatch, revertUser]);

  const handleClickItem = useCallback(
    async (item: User) => {
      setSelectedUserId(item._id === selectedUserId ? '' : item._id);
      if (info) {
        setIsCreating(true);
        const response = await findOrCreateChat({
          receiveId: item._id,
          senderId: info?._id,
        });
        setIsCreating(false);
        if (
          response.statusCode === HttpStatusCode.Ok ||
          response.statusCode === HttpStatusCode.Created
        ) {
          dispatch(setChat(response.data));
          dispatch(
            findChat({
              senderId: info._id,
            })
          );
          dispatch(setCurrentChat(response.data));
        }
        toast({
          description: response.message,
          status: typeToast(response.statusCode),
          position: 'top-left',
          isClosable: true,
          duration: 4000,
        });
      }
      onClose();
    },
    [selectedUserId]
  );

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip
          label="Search user to chat"
          hasArrow
          placement="bottom-end"
        >
          <Button
            variant="outline"
            onClick={onOpen}
          >
            <SearchIcon />
            <Text
              fontSize="medium"
              px={4}
            >
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text
          fontSize="2xl"
          fontFamily="Work sans"
        >
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              {/* <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              /> */}
              <BellIcon
                fontSize="2xl"
                m={1}
              />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="white"
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={info?.username}
                src={info?.avatar}
              />
            </MenuButton>
            <MenuList>
              <ProfileComponent user={info}>
                <MenuItem>My Profile</MenuItem>
              </ProfileComponent>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box
              display="flex"
              pb={2}
            >
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Box>
            {searchText ? (
              filteredUsers?.length > 0 ? (
                filteredUsers.map((item, index) => (
                  <ItemUser
                    isLoading={isCreating}
                    key={item._id}
                    data={item}
                    selectedUserId={selectedUserId}
                    onClick={() => handleClickItem(item)}
                  />
                ))
              ) : (
                <Text
                  textAlign="center"
                  fontSize="24px"
                >
                  Not found
                </Text>
              )
            ) : users?.length > 0 ? (
              users.map((item, index) => (
                <ItemUser
                  isLoading={isCreating}
                  key={item._id}
                  data={item}
                  selectedUserId={selectedUserId}
                  onClick={() => handleClickItem(item)}
                />
              ))
            ) : (
              <Text
                textAlign="center"
                fontSize="24px"
              >
                Not found
              </Text>
            )}
            {/* {isLoadingUsers && (
              <Spinner
                m="auto"
                display="flex"
              />
            )} */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
