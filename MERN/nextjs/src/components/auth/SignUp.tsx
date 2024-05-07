'use client';

import { typeToast } from '@/utilities/functions/toast.function';
import { setInfo, setToken } from '@/utilities/redux/slices/user.slice';
import { useAppDispatch } from '@/utilities/redux/store/index.store';
import { signUp } from '@/utilities/services/user.service';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import { useCallback, useState } from 'react';
import validator from 'validator';

export default function SignUp() {
  const toast = useToast();
  const [userInfo, setUserInfo] = useState<UserSignUpType>({
    username: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOnChangeInput = (event: any) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [event.target.name]: !event.target?.files
        ? event.target.value
        : event.target?.files[0],
    }));
  };

  const handleSubmits = useCallback(async () => {
    if (!validator.isAlphanumeric(userInfo.username)) {
      toast({
        title: 'Invalid Info',
        description: 'Your username  is not valid',
        status: 'error',
        isClosable: true,
        position: 'top-left',
        duration: 4000,
      });
      return;
    }
    if (!validator.isEmail(userInfo.email)) {
      toast({
        title: 'Invalid Info',
        description: 'Your email is not valid',
        status: 'error',
        isClosable: true,
        position: 'top-left',
        duration: 4000,
      });
      return;
    }
    setIsLoading(true);
    toast.closeAll();

    const response = await signUp(userInfo);
    setIsLoading(false);
    toast({
      description: response.message,
      status: typeToast(response.statusCode),
      position: 'top-left',
      isClosable: true,
      duration: 4000,
    });
    if (response.statusCode === HttpStatusCode.Created) {
      setUserInfo({
        username: '',
        email: '',
        password: '',
        avatar: null,
      });
      if (response.accessToken) dispatch(setToken(response.accessToken));
      if (response.data) dispatch(setInfo(response.data));
    }
  }, [toast, userInfo]);

  return (
    <VStack spacing="5px">
      <FormControl
        id="first-name"
        isRequired
        marginBottom="12px"
        isDisabled={isLoading}
      >
        <FormLabel htmlFor="name">Name:</FormLabel>
        <Input
          placeholder="Enter your name"
          id="name"
          name="username"
          onChange={handleOnChangeInput}
          value={userInfo.username}
          type="text"
        />
      </FormControl>
      <FormControl
        id="email"
        isRequired
        marginBottom="12px"
        isDisabled={isLoading}
      >
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          placeholder="Enter your Email"
          id="email"
          name="email"
          onChange={handleOnChangeInput}
          value={userInfo.email}
          type="text"
        />
      </FormControl>
      <FormControl
        id="password"
        isRequired
        marginBottom="12px"
        isDisabled={isLoading}
      >
        <FormLabel htmlFor="password">Password:</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            name="password"
            onChange={handleOnChangeInput}
            value={userInfo.password}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl
        id="avatar"
        marginBottom="12px"
        isDisabled={isLoading}
      >
        <FormLabel htmlFor="avatar">Avatar:</FormLabel>
        <Input
          placeholder="Enter your avatar"
          id="avatar"
          name="avatar"
          onChange={handleOnChangeInput}
          type="file"
          accept="image/*"
          p={1.5}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmits}
        isLoading={isLoading}
        isDisabled={!(userInfo.email && userInfo.password && userInfo.username)}
      >
        Sign Up
      </Button>
    </VStack>
  );
}