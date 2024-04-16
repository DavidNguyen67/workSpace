import { useCallback, useEffect, useState } from 'react';
import { getRoom } from '../utilities/services/room.service';
import { Spinner } from 'react-bootstrap';
import ChatBox from './ChatBox';

function Room(props: { recipientId: string; senderId: string }) {
  const { recipientId, senderId } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roomId, setRoomId] = useState<string>('');

  const handleGetRoomDetail = useCallback(async () => {
    setIsLoading(true);
    if (recipientId && senderId) {
      const response: RoomResponse[] = await getRoom(recipientId);
      if (response?.length > 0) {
        setRoomId(response[0]?.id);
      }
    }
    setIsLoading(false);
  }, [recipientId, senderId]);

  useEffect(() => {
    handleGetRoomDetail();
  }, [handleGetRoomDetail, recipientId]);

  return (
    <>
      {isLoading ? (
        <Spinner
          animation="border"
          color="white"
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
