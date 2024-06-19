import {create} from 'zustand';
import User from '~/models/user';


interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: { id: "", phone: "", name: "", email: "" },

  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
