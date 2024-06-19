import {create} from 'zustand';
import UserData from '~/models/user_data';


interface UserStore {
  userData: UserData;
  setUserData: (userData: UserData) => void;
}

const useUserDataStore = create<UserStore>((set) => ({
  userData: new UserData('', '', '', '', '', '', '', '', '', ''),

  setUserData: (userData: UserData) => set({ userData }),
}));

export default useUserDataStore;
