import { SocketOptions } from 'dgram';
import { ManagerOptions } from 'socket.io-client';

const socketConfig: Partial<ManagerOptions & SocketOptions> = {
  autoConnect: true,
  reconnectionAttempts: 2,
  reconnectionDelay: 2,
};
export default socketConfig;
