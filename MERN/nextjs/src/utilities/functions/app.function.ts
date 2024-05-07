export const getReceive = (joiners: User[], senderId: string): User | null => {
  const sender = joiners.find((user) => user._id !== senderId);

  if (!sender || !sender.username) {
    return null;
  }

  return sender;
};
