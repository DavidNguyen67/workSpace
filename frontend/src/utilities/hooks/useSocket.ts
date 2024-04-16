import { useCallback, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';
import {
  CONNECT,
  DISCONNECT,
  SOCKET_ACTION,
} from '../constants/constant-socket';
import socketConfig from '../config/socket.config';

const useSocket = () => {
  const [socket, setSocket] = useState(
    io('http://localhost:8080', socketConfig)
  );

  const [isConnected, setIsConnected] = useState(socket?.connected);

  const [isSending, setIsSending] = useState<boolean>(false);

  const toastId: string = useMemo(() => v4(), []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFinish() {
      setIsSending(false);
    }

    socket.on(CONNECT, onConnect);
    socket.on(DISCONNECT, onDisconnect);
    socket.on(SOCKET_ACTION.finish, onFinish);

    return () => {
      socket.off(CONNECT, onConnect);
      socket.off(DISCONNECT, onDisconnect);
      socket.off(SOCKET_ACTION.finish, onFinish);
    };
  }, [socket]);

  const changeNameSpace = useCallback(
    (nameSpace: string) => {
      if (socket) {
        socket.disconnect();
      }
      setSocket(io(`http://localhost:8080/${nameSpace}`, socketConfig));
    },
    [socket]
  );

  return {
    toastId,
    socket,
    isConnected,
    changeNameSpace,
    setIsSending,
    isSending,
  };
};

export default useSocket;
