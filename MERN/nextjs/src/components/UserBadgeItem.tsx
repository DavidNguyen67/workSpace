import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/react';

interface UserBadgeItemProps {
  onClick: any;
  data: User;
}

const UserBadgeItem = (props: UserBadgeItemProps) => {
  const { onClick, data } = props;

  return (
    <>
      <Badge
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        colorScheme="purple"
        cursor="pointer"
        onClick={onClick}
      >
        {data.username}
        {/* {admin === user._id && <span> (Admin)</span>} */}
        <CloseIcon pl={1} />
      </Badge>
    </>
  );
};

export default UserBadgeItem;
