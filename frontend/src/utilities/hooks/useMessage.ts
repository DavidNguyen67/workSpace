import { useCallback, useEffect } from 'react';
import { useAppDispatch } from './reduxHook';
import useSocket from './useSocket';
import { SOCKET_ACTION } from '../constants/constant-socket';
import { receiveMessage } from '../../redux/slices/user.slice';

const useMessage = (newMessage: Message | null) => {
  const dispatch = useAppDispatch();
  const { socket, isConnected, setIsSending } = useSocket();

  const sendMessage = useCallback(() => {
    if (isConnected) {
      try {
        setIsSending(true);
        socket.emit(SOCKET_ACTION.sendMessage, newMessage);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isConnected, setIsSending, socket, newMessage]);

  useEffect(() => {
    const handleReceiveMessage = (payload: Message) => {
      dispatch(receiveMessage(payload));
    };
    socket.on(SOCKET_ACTION.receiveMessage, handleReceiveMessage);

    return () => {
      socket.off(SOCKET_ACTION.receiveMessage, handleReceiveMessage);
    };
  }, [dispatch, socket]);

  return { dispatch, sendMessage };
};

export default useMessage;
