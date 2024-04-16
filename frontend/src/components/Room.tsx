import { useCallback, useEffect, useState } from 'react';
import { getRoom } from '../utilities/services/room.service';
import { Spinner } from 'react-bootstrap';
import ChatBox from './ChatBox';
import { useAppSelector } from '../utilities/hooks/reduxHook';

function Room(props: {
  recipientId: string;
  setIsDisableCreateRoom: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { recipientId, setIsDisableCreateRoom } = props;
  const { userId } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roomId, setRoomId] = useState<string>('');

  const handleGetRoomDetail = useCallback(async () => {
    setIsLoading(true);
    if (recipientId && userId) {
      const response: RoomResponse[] = await getRoom(recipientId);
      if (response?.length > 0) {
        setRoomId(response[0]?.id);
        setIsDisableCreateRoom(true);
      } else {
        setIsDisableCreateRoom(false);
        setRoomId('');
      }
    }
    setIsLoading(false);
  }, [recipientId, setIsDisableCreateRoom, userId]);

  useEffect(() => {
    handleGetRoomDetail();
  }, [handleGetRoomDetail, recipientId]);

  return (
    <>
      {isLoading ? (
        <Spinner
          animation="border"
          variant="light"
          className="m-auto"
        />
      ) : (
        recipientId && (
          <ChatBox
            recipientId={recipientId}
            roomId={roomId}
          />
        )
      )}
    </>
  );
}

export default Room;
