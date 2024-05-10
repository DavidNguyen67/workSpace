import { useAppSelector } from '@/utilities/redux/store';
import { Avatar, Box, Spinner, Text } from '@chakra-ui/react';
import { LegacyRef, MouseEventHandler } from 'react';

interface ItemUserProps {
  data: User;
  onClick: MouseEventHandler<HTMLDivElement>;
  selectedUserIds?: string[];
  isLoading?: boolean;
  selectedUserId?: string;
}

const ItemUser = (props: ItemUserProps) => {
  const { onClick, data, selectedUserIds, isLoading, selectedUserId } = props;
  const { info } = useAppSelector((state) => state.user);

  if (info?._id !== data._id) {
    if (selectedUserIds && selectedUserIds.includes(data._id)) return;
    return (
      <>
        <Box
          onClick={(event) => {
            if (isLoading) return;
            onClick(event);
          }}
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
          py={4}
          mb={2}
          borderRadius="lg"
          justifyContent={'space-between'}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            w="100%"
          >
            <Box
              display={'flex'}
              alignItems={'center'}
            >
              <Avatar
                mr={2}
                my={'auto'}
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
            {isLoading && selectedUserId === data._id && (
              <Spinner
                display="flex"
                my={'auto'}
              />
            )}
          </Box>
        </Box>
      </>
    );
  }
};

export default ItemUser;
