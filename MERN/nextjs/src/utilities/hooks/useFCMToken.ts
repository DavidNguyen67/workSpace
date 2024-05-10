'use client';
import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '@/configs/firebase.config';

/**
 * Hook tùy chỉnh để quản lý logic liên quan đến việc lấy FCM Token và quản lý quyền thông báo.
 * Sử dụng để kiểm tra quyền thông báo, lấy FCM Token và cập nhật trạng thái quyền thông báo.
 * @returns {Object} Một đối tượng chứa FCM Token và trạng thái quyền thông báo.
 */
const useFcmToken = () => {
  // State để lưu trữ FCM Token
  const [fcmToken, setFcmToken] = useState('');

  // State để lưu trữ trạng thái quyền thông báo
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        // Kiểm tra nếu trình duyệt hỗ trợ serviceWorker
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Yêu cầu quyền thông báo từ người dùng
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Nếu quyền được cấp, thì lấy FCM Token từ Firebase
          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR, // Thay thế bằng khóa VAPID của dự án Firebase của bạn
            });
            if (currentToken) {
              setFcmToken(currentToken);
            } else {
              console.log(
                'Không có mã token đăng ký nào có sẵn. Yêu cầu quyền để tạo mới.'
              );
            }
          }
        }
      } catch (error) {
        console.log('Lỗi khi lấy mã token:', error);
      }
    };

    retrieveToken();
  }, []);

  // Trả về FCM Token và trạng thái quyền thông báo
  return { fcmToken, notificationPermissionStatus };
};

export default useFcmToken;
