'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/index.store';
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from '@/configs/firebase.config';
import useFcmToken from './useFCMToken';
import { setFirebaseToken, setSocket } from '../redux/slices/socket.slice';
import { io } from 'socket.io-client';
import { useToast } from '@chakra-ui/react';

const useSocket = () => {
  const { firebaseToken, socket } = useAppSelector((state) => state.socket);
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const toast = useToast();
  const toastIdRef: any = useRef();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) =>
          console.log('Foreground push notification received:', payload)
        );
        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  useEffect(() => {
    if (!firebaseToken) {
      dispatch(setFirebaseToken(fcmToken));
    }
  }, [fcmToken]);

  useEffect(() => {
    if (!socket) {
      if (process.env.NEXT_PUBLIC_BASE_URL_WS) {
        dispatch(setSocket(io(process.env.NEXT_PUBLIC_BASE_URL_WS)));
      } else {
        if (toastIdRef.current) {
          toast.close(toastIdRef.current);
        }
        toastIdRef.current = toast({
          status: 'error',
          title: 'Missing process.env.NEXT_PUBLIC_BASE_URL_WS',
        });
      }
    }
  }, [notificationPermissionStatus]);

  return { firebaseToken, socket };
};

export default useSocket;
