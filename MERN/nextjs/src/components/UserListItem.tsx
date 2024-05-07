import { Avatar, Box, Text } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

interface UserListItemProps {
  data: User;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const UserListItem = (props: UserListItemProps) => {
  const { onClick, data } = props;
  return (
    <>
      <Box
        onClick={onClick}
        cursor="pointer"
        bg="#E8E8E8"
        _hover={{
          background: '#38B2AC',
          color: 'white',
        }}
        w="100%"
        display="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={data.username}
          src={data.avatar}
        />
        <Box>
          <Text>{data.username}</Text>
          <Text fontSize="xs">
            <b>Email : </b>
            {data.email}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;
