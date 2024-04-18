// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { io } from 'socket.io-client';
// import { v4 } from 'uuid';
// import {
//   CONNECT,
//   DISCONNECT,
//   SOCKET_ACTION,
// } from '../constants/constant-socket';
// import socketConfig from '../config/socket.config';

const useSocket = () => {
  //   const [socket, setSocket] = useState(
  //     io('http://localhost:8080', socketConfig)
  //   );
  //   const [onlineUsersId, setOnlineUsersId] = useState<string[]>([]);
  //   const [isConnected, setIsConnected] = useState(socket?.connected);
  //   const [isSending, setIsSending] = useState<boolean>(false);
  //   const toastId: string = useMemo(() => v4(), []);
  //   useEffect(() => {
  //     const onConnect = () => {
  //       setIsConnected(true);
  //     };
  //     const onDisconnect = () => {
  //       setIsConnected(false);
  //     };
  //     const getOnlineUsers = (payload: string[]) => {
  //       setOnlineUsersId(payload);
  //     };
  //     socket.on(CONNECT, onConnect);
  //     socket.on(DISCONNECT, onDisconnect);
  //     socket.on(SOCKET_ACTION.GET_USERS_ONLINE, getOnlineUsers);
  //     return () => {
  //       socket.off(CONNECT, onConnect);
  //       socket.off(DISCONNECT, onDisconnect);
  //       socket.off(SOCKET_ACTION.GET_USERS_ONLINE, getOnlineUsers);
  //     };
  //   }, []);
  //   const changeNameSpace = useCallback(
  //     (nameSpace: string) => {
  //       if (socket) {
  //         socket.disconnect();
  //       }
  //       setSocket(io(`http://localhost:8080/${nameSpace}`, socketConfig));
  //     },
  //     [socket]
  //   );
  //   return {
  //     toastId,
  //     socket,
  //     onlineUsersId,
  //     isConnected,
  //     changeNameSpace,
  //     setIsSending,
  //     isSending,
  //   };
};

export default useSocket;
