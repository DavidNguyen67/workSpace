export interface UserState {
  token: string;
  info: User | null;
  chat: Chat | null;
  currentChat: Chat | null;
}
