import { MESSAGE_CONSTANTS } from '@/utilities/constants';
import { SocketOptions } from 'dgram';
import { ManagerOptions } from 'socket.io-client';

const socketConfig: Partial<ManagerOptions & SocketOptions> = {
  path: MESSAGE_CONSTANTS.PREFIX,
};

export default socketConfig;
