'use client';
import ScrollToTop from '@/components/ScrollToTop';
import Login from '@/components/auth/Login';
import SignUp from '@/components/auth/SignUp';
import { useAppSelector } from '@/utilities/redux/store';
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { token, info } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (token || info) {
      router.push('/chat');
      return;
    }
  }, [token, info]);

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="center"
        padding={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl">Join with us</Text>
      </Box>
      <Box
        padding={4}
        bg="white"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Sign up</Tab>
            <Tab width="50%">Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignUp />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
