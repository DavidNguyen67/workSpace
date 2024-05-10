export interface AppState {
  users: User[];
  chats: Chat[];
  isLoading: boolean;
  message: string;
  firebaseToken: string;
  maxRecord: number;
}
