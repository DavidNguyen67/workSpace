'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from '@/configs/firebase.config';
import { setFirebaseToken } from '../redux/slices';
import useFcmToken from './useFCMToken';

/**
 * Hook tùy chỉnh để quản lý logic liên quan đến ứng dụng.
 * Sử dụng để xử lý việc lấy và quản lý Firebase Token, FCM Token và cấp quyền thông báo.
 * @returns {Object} Một đối tượng chứa Firebase Token.
 */
const useApp = () => {
  // Lấy thông tin Firebase Token từ Redux store
  const { firebaseToken } = useAppSelector((state) => state.app);

  // Sử dụng hook để lấy FCM Token và trạng thái quyền thông báo từ hook useFcmToken
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  const dispatch = useAppDispatch();

  // Effect để đăng ký nhận push notification khi quyền thông báo được cấp
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

  // Effect để cập nhật Firebase Token khi FCM Token thay đổi
  useEffect(() => {
    if (!firebaseToken) {
      dispatch(setFirebaseToken(fcmToken));
    }
  }, [fcmToken]);

  // Trả về Firebase Token
  return { firebaseToken };
};

export default useApp;
