import useSocket from '@/utilities/hooks/useSocket';

function NotificationComponent() {
  const { firebaseToken, socket } = useSocket();

  return <>{firebaseToken}</>;
}

export default NotificationComponent;
