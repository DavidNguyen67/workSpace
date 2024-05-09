import { Box, FormControl, IconButton, Input, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/utilities/redux/store/index.store';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface ChatBoxProps {}

const ChatBox = (props: ChatBoxProps) => {
  const { currentChatId } = useAppSelector((state) => state.user);

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
      >
        {currentChatId ? (
          <>
            <Text
              fontSize={{ base: '28px', md: '30px' }}
              pb={3}
              px={2}
              w="100%"
              fontFamily="Work sans"
              display="flex"
              justifyContent={{ base: 'space-between' }}
              alignItems="center"
            >
              <IconButton
                aria-label="Back"
                display={{ base: 'flex', md: 'none' }}
                icon={<ArrowBackIcon />}
              />
            </Text>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#E8E8E8"
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            >
              <FormControl
                id="first-name"
                isRequired
                mt={3}
              >
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                />
              </FormControl>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Text
              fontSize="3xl"
              pb={3}
              fontFamily="Work sans"
            >
              Click on a user to start chatting
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ChatBox;
