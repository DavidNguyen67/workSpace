import { useAppDispatch, useAppSelector } from '@/utilities/redux/store';
import { Avatar } from '@chakra-ui/avatar';
import { Tooltip } from '@chakra-ui/tooltip';
import ScrollableFeed from 'react-scrollable-feed';

interface ScrollableChatProps {
  messages: MessageSentResponse[];
}

const ScrollableChat = (props: ScrollableChatProps) => {
  const { messages } = props;
  const { info } = useAppSelector((state) => state.user);

  return (
    <ScrollableFeed>
      {messages?.length > 0 &&
        messages.map((item, index) => {
          // Kiểm tra xem tin nhắn hiện tại có phải là tin nhắn cuối cùng của người gửi không
          const isLastMessageOfSender =
            index === messages.length - 1 ||
            item.sender?._id !== messages[index + 1]?.sender?._id;

          return (
            <div
              style={{ display: 'flex' }}
              key={item._id}
            >
              {item.sender?._id !== info?._id && isLastMessageOfSender && (
                <Tooltip
                  label={item.sender.username}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="4px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={item.sender?.username}
                    src={item.sender?.avatar}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    item.sender?._id === info?._id ? '#BEE3F8' : '#B9F5D0'
                  }`,
                  marginLeft:
                    item.sender?._id !== info?._id
                      ? isLastMessageOfSender
                        ? 11
                        : 48
                      : 'auto',
                  marginTop: '4px',
                  // marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  // marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  maxWidth: '75%',
                }}
              >
                {item.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
