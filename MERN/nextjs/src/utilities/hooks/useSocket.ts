'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { io } from 'socket.io-client';
import { useToast } from '@chakra-ui/react';
import { setSocket } from '../redux/slices';
import socketConfig from '@/configs/socket.config';

/**
 * Hook tùy chỉnh để quản lý kết nối WebSocket.
 * Hook này khởi tạo kết nối WebSocket nếu chưa được thiết lập.
 * Nếu URL của WebSocket không được cung cấp trong biến môi trường, hook sẽ hiển thị một thông báo lỗi.
 * @returns {Object} Một đối tượng chứa instance của WebSocket.
 */
const useSocket = () => {
  const { socket } = useAppSelector((state) => state.socket);
  const toast = useToast();
  const [isConnected, setIsConnected] = useState<boolean>(!!socket?.connected);
  const toastIdRef: any = useRef();
  const dispatch = useAppDispatch();

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect(() => {
    // Khởi tạo kết nối WebSocket nếu chưa được thiết lập
    if (!socket) {
      if (process.env.NEXT_PUBLIC_BASE_URL_WS) {
        // Tạo một instance mới của WebSocket
        dispatch(
          setSocket(io(process.env.NEXT_PUBLIC_BASE_URL_WS, socketConfig))
        );
      } else {
        // Hiển thị một thông báo lỗi nếu thiếu URL của WebSocket
        if (toastIdRef.current) {
          toast.close(toastIdRef.current);
        }
        toastIdRef.current = toast({
          status: 'error',
          title: 'Thiếu biến môi trường NEXT_PUBLIC_BASE_URL_WS',
        });
        console.log('Thiếu biến môi trường NEXT_PUBLIC_BASE_URL_WS');
      }
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
    }

    return () => {
      if (socket) {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      }
    };
  }, []);

  return { socket, isConnected };
};

export default useSocket;
