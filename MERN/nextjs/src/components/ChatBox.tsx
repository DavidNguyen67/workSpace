import { Box, Spinner } from '@chakra-ui/react';
import { useAppSelector } from '@/utilities/redux/store';
import SingleChat from './SingleChat';

interface ChatBoxProps {}

const ChatBox = (props: ChatBoxProps) => {
  const { currentChat } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.app);

  return (
    <>
      <Box
        alignItems="center"
        flexDir="column"
        p={3}
        bg="white"
        w={{ base: '100%', md: '68%' }}
        borderRadius="lg"
        borderWidth="1px"
        display={{ base: currentChat ? 'flex' : 'none', md: 'flex' }}
      >
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            m="auto"
            display="flex"
          />
        ) : (
          <SingleChat />
        )}
      </Box>
    </>
  );
};

export default ChatBox;
