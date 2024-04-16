export interface MessageState {
  userId: string | null;
  userToken: string | null;
  messages: Message[];
  isOnline: boolean;
}
