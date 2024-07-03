


import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import {User} from '~/models/user';

interface UserState {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: new User({
        id: '',
        phone: '',
      }),
      setUser: (user: User) => set({ user }),
      logout: async () => {
        set({
          user: new User({
            id: '',
            phone: '',
          }),
        });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'user-storage', // name of item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
