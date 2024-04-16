import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../utilities/hooks/reduxHook';
import { getUsers } from '../utilities/services/user.service';
import { Spinner } from 'react-bootstrap';
import Room from '../components/Room';
import * as Icon from 'react-bootstrap-icons';
import './../index.css';
import { createRoom } from '../utilities/services/room.service';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

const App = () => {
  const { userId } = useAppSelector((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recipientId, setRecipientId] = useState<string>('');
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);

  const handleGetUsers = useCallback(async () => {
    const response: User[] = await getUsers();
    setIsLoading(false);
    response?.length > 0 && setUsers(response);
  }, []);
  const handleCreateRoom = useCallback(async () => {
    if (userId && recipientId) {
      setIsCreatingRoom(true);
      await createRoom({
        id: v4(),
        firstUserId: userId || '',
        secondUserId: recipientId,
      });
      setIsCreatingRoom(false);
      return;
    }
    toast.error('Missing recipientId or senderId');
    return;
  }, [recipientId, userId]);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <div className="row mt-4">
      <div className="col-12 col-sm-6 col-md-3">
        <div className="item">
          <button
            className="btn btn-primary w-100"
            onClick={handleCreateRoom}
            disabled={isCreatingRoom}
          >
            {isCreatingRoom ? (
              <Spinner
                animation="border"
                size="sm"
                color="white"
              />
            ) : (
              'Create Chat'
            )}
          </button>
        </div>
        <div className="item m-2">
          {isLoading ? (
            <Spinner
              animation="border"
              size="sm"
              color="white"
            />
          ) : (
            users?.length > 0 &&
            // eslint-disable-next-line array-callback-return
            users.map((item) => {
              if (item.id !== userId)
                return (
                  <div
                    key={item.id}
                    className={
                      recipientId === item?.id
                        ? `p-2 d-flex align-items-center activeOption`
                        : `p-2 d-flex align-items-center itemOption`
                    }
                    onClick={() => {
                      setRecipientId(
                        recipientId === item.id ? '' : item.id || ''
                      );
                    }}
                  >
                    <div className="d-flex align-items-center ">
                      <Icon.PersonCircle
                        className="me-2"
                        color="white"
                        size={40}
                      />
                      <div className="lead text-white">
                        <div>
                          <b>{item.name}</b>
                        </div>
                        <small>{item.name}</small>
                      </div>
                    </div>
                    <Icon.Dot
                      className="ms-auto"
                      color="green"
                      size={40}
                    />
                  </div>
                );
            })
          )}
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-9">
        <Room
          recipientId={recipientId}
          senderId={userId || ''}
        />
      </div>
    </div>
  );
};

export default App;
