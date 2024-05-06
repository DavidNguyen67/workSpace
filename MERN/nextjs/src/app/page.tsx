'use client';
import Login from '@/components/auth/Login';
import SignUp from '@/components/auth/SignUp';
import NotificationComponent from '@/components/notifications/NotificationComponent';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <>
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

      <NotificationComponent />
    </>
  );
}
