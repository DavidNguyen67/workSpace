'use client';
import {
  useAppDispatch,
  useAppSelector,
} from '@/utilities/redux/store/index.store';
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
import { useCallback, useEffect, useState } from 'react';
import ProfileComponent from './profile/Profile';
import { revertAll } from '@/utilities/redux/slices/user.slice';
import { findAll, findOrCreateChat } from '@/utilities/services';
import isEmail from 'validator/lib/isEmail';
import UserListItem from './UserListItem';
import { HttpStatusCode } from 'axios';
import { setUsers } from '@/utilities/redux/slices/app.slice';
import { HARD_CODE_LIMIT_DOCUMENT } from '@/utilities/constants';

function SideDrawer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { info } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState<string>('');
  const toast = useToast();
  const { users } = useAppSelector((state) => state.app);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleLogout = useCallback(() => {
    dispatch(revertAll());
    toast({
      title: 'Logout success fully',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-left',
    });
  }, [dispatch, revertAll]);

  const handleSearch = useCallback(() => {
    let payload: UserFindByEmailOrUsername = {
      email: '',
      username: '',
    };
    if (isEmail(searchText)) {
      payload.email = searchText;
    }
    if (!isEmail(searchText)) {
      payload.username = searchText;
    }
    if (users.length > 0)
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
  }, [searchText]);

  const handleFetchUsers = useCallback(async () => {
    setIsLoading(true);
    const response = await findAll({
      limit: HARD_CODE_LIMIT_DOCUMENT,
      skip: users.length || 0,
    });
    setIsLoading(false);
    if (response.statusCode === HttpStatusCode.NotFound) {
      toast({
        title: 'Null users',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
    }
    dispatch(setUsers(response.data));
  }, []);

  const handleClickItem = async (item: User) => {
    if (info) {
      console.log({
        receiveId: item._id,
        senderId: info?._id,
      });

      const response = await findOrCreateChat({
        receiveId: item._id,
        senderId: info?._id,
      });
      console.log(response);
    }
    onClose();
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

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
              filteredUsers.length > 0 ? (
                filteredUsers.map((item) => (
                  <UserListItem
                    key={item._id}
                    data={item}
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
            ) : users.length > 0 ? (
              users.map((item) => (
                <UserListItem
                  key={item._id}
                  data={item}
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
            {isLoading && (
              <Spinner
                m="auto"
                display="flex"
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
