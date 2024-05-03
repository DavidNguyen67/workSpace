import firebaseApp from '@/configs/firebase.config';
import useFcmToken from '@/utilities/hooks/useFCMToken';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';

function NotificationComponent() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

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

  return (
    <>
      <p>token:{fcmToken}</p>
    </>
  );
}

export default NotificationComponent;
