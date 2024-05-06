'use client';

import { typeToast } from '@/utilities/functions/toast.function';
import { login } from '@/utilities/services/user.service';
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
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HttpStatusCode } from 'axios';

export default function Login() {
  const [userInfo, setUserInfo] = useState<UserSignInType>({
    email: '',
    password: '',
  });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const handleOnChangeInput = (event: any) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [event.target.name]: !event.target?.files
        ? event.target.value
        : event.target?.files[0],
    }));
  };
  const handleSubmits = useCallback(async () => {
    setIsLoading(true);
    toast.closeAll();
    const response = await login(userInfo);
    console.log(response);

    toast({
      description: response.message,
      status: typeToast(response.statusCode),
      position: 'top-right',
      duration: 4000,
    });
    if (response.statusCode === HttpStatusCode.Ok) {
      router.push('/chat');
    }

    setIsLoading(false);
  }, [toast, userInfo]);

  return (
    <VStack spacing="5px">
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
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmits}
        isLoading={isLoading}
        isDisabled={!(userInfo.email && userInfo.password)}
      >
        Sign Up
      </Button>
    </VStack>
  );
}
