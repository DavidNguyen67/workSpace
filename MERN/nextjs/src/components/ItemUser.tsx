import { useAppSelector } from '@/utilities/redux/store/index.store';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

interface ItemUserProps {
  data: User;
  onClick: MouseEventHandler<HTMLDivElement>;
  selectedUserIds?: string[];
}

const ItemUser = (props: ItemUserProps) => {
  const { onClick, data, selectedUserIds } = props;
  const { info } = useAppSelector((state) => state.user);
  if (info?._id !== data._id) {
    if (selectedUserIds && selectedUserIds.includes(data._id)) return;
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
  }
};

export default ItemUser;
