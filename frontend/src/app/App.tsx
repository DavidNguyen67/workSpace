import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../utilities/hooks/reduxHook';
import { getUsers } from '../utilities/services/user.service';
import { Spinner } from 'react-bootstrap';
import Room from '../components/Room';
import './../index.css';
import { createRoom } from '../utilities/services/room.service';
import toast from 'react-hot-toast';
import _ from 'lodash';
import { Dot, PersonCircle } from 'react-bootstrap-icons';

const App = () => {
  const { userId } = useAppSelector((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recipientId, setRecipientId] = useState<string>('');
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);
  const [isDisableCreateRoom, setIsDisableCreateRoom] =
    useState<boolean>(false);

  const handleGetUsers = useCallback(async () => {
    const response: User[] = await getUsers();
    setIsLoading(false);
    response?.length > 0 && setUsers(response);
  }, []);
  const handleCreateRoom = useCallback(async () => {
    if (userId && recipientId) {
      setIsCreatingRoom(true);
      await createRoom({
        id: _.join(
          _.orderBy(
            [userId, recipientId],
            [(userId) => userId.toLowerCase()],
            ['desc']
          ),
          '_'
        ),
        firstUserId: userId || '',
        secondUserId: recipientId,
      });
      setIsDisableCreateRoom(true);
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
      <div className="col-12 col-sm-6 col-md-5 col-lg-4">
        <div className="item">
          <button
            className="btn btn-primary w-100"
            onClick={handleCreateRoom}
            disabled={isDisableCreateRoom || isCreatingRoom}
          >
            {isCreatingRoom ? (
              <Spinner
                animation="border"
                size="sm"
                variant="light"
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
              variant="light"
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
                      <PersonCircle
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
                    <Dot
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
      <div className="col-12 col-sm-6 col-md-7 col-lg-8">
        <Room
          recipientId={recipientId}
          setIsDisableCreateRoom={setIsDisableCreateRoom}
        />
      </div>
    </div>
  );
};

export default App;
