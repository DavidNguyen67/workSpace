'use client';

import ChatBox from '@/components/ChatBox';
import SideDrawer from '@/components/SideDrawer';
import { useAppSelector } from '@/utilities/redux/store/index.store';
import { Box } from '@chakra-ui/react';

export default function Chat() {
  const { token, info } = useAppSelector((state) => state.user);

  return (
    <div style={{ width: '100%' }}>
      {token && info && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {info && <ChatBox />}
      </Box>
    </div>
  );
}
