import { Socket } from 'socket.io-client';

export interface SocketState {
  socket: Socket<any, any> | null;
  firebaseToken: string;
}
