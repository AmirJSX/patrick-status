import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserStore } from '~/types/user';

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      addUser: (user) => {
        const users = get().users;
        const isDuplicate = users.some((user) => user.hash === user.hash && user.email === user.email);

        if (!isDuplicate) {
          set((state) => ({ users: [...state.users, user] }));
        }
      },
      removeUser: (hash) =>
        set((state) => ({
          users: state.users.filter((user) => user.hash !== hash),
        })),
    }),
    {
      name: 'users-store',
    },
  ),
);
