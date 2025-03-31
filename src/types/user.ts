export type User = {
  hash: string;
  email: string;
};
export type UserStore = {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (hash: string) => void;
};
