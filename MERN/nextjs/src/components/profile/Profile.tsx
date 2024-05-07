import { ViewIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

interface ProfileComponentProps {
  user: User | null;
  children: React.ReactNode;
}

const ProfileComponent = (props: ProfileComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { children, user } = props;

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          aria-label="none"
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user?.username}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar
              size="2xl"
              name={user?.username}
              src={user?.avatar}
            />
            <Text
              fontFamily="Work sans"
              fontSize="2xl"
            >
              Email: {user?.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileComponent;
