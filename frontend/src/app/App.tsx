import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSocket from '../utilities/hooks/useSocket';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import useMessage from '../utilities/hooks/useMessage';
import { useAppSelector } from '../utilities/hooks/reduxHook';
import { getUsers } from '../utilities/services/user.service';

export default function App() {
  const [message, setMessage] = useState<Message | null>(null);
  const messageId: string = useMemo(() => v4(), []);
  const { sendMessage } = useMessage(message);
  // const { isSending, isConnected, toastId } = useSocket();
  const { userId } = useAppSelector((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);

  const handleChangeMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage({
      message: event.target?.value?.trim() ?? event.target?.value,
      id: messageId,
    });
  };
  const handleSendMessage = () => {
    sendMessage();
  };
  const handleGetUsers = useCallback(async () => {
    const response: User[] = await getUsers();
    response?.length > 0 && setUsers(response);
  }, []);

  // useEffect(() => {
  //   if (!isConnected) {
  //     toast.remove(toastId);
  //     toast.error(`The connection isn't established`, {
  //       id: toastId,
  //     });
  //     return;
  //   }
  //   if (isConnected) {
  //     toast.remove(toastId);
  //     toast.success(`The connection is established`, {
  //       id: toastId,
  //     });
  //     return;
  //   }

  //   return () => {
  //     toast.remove(toastId);
  //   };
  // }, [isConnected, toastId]);
  useEffect(() => {
    handleGetUsers();
  }, []);

  return <></>;
}
