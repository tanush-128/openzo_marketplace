import User from '~/models/user';
import UserData from '~/models/user_data';
import useUserDataStore from '~/providers/userDataStore';
import useUserStore from '~/providers/userStore';
import { getLocation } from '~/services/LocationService';




export async function handleUserLogin( mobileNo : string) {
  try {
    const isSignedIn = await User.signIn(mobileNo);
    if (isSignedIn) {
      const user = await  User.getUserWithJWT();
      useUserStore.getState().setUser(user);
      return user;
    }
    throw new Error('Failed to sign in');
  } catch (error) {
    console.error(error);
    throw new Error('Login failed: ');
  }
}

export async function handleUserData(mobileNo : string | null) {
  const fcmToken = localStorage.getItem('fcmToken');
  const userDataId = localStorage.getItem('user_data_id');

  if (mobileNo == null || mobileNo === "") {
    if (!userDataId) {
      await createNewUserData(null, fcmToken ?? "");
    } else {
      console.log('UserData Id: ', userDataId);
      const userData = await UserData.getUserData(userDataId);
      await updateUserDataContext(userData, null, fcmToken ?? "");
    }
  } else {
    const user = await handleUserLogin(mobileNo);

    try {
      const userData = await UserData.getUserDataByUserID(user.id);
      await updateUserDataContext(userData, user, fcmToken ?? "");
      console.log('User data already exists');
    } catch (error) {
      console.error(error);
      await createNewUserData(user, fcmToken??"");
    }
  }
}

async function updateUserDataContext(userData : UserData, user : User | null, fcmToken :string) {
  if (userData.notificationToken !== fcmToken || userData.userId !== user?.id) {
    userData.notificationToken = fcmToken;
    userData.userId = user?.id || "";
   
    userData = await UserData.updateUserData(userData);
  }
  localStorage.setItem('user_data_id', userData.id);
  useUserDataStore.getState().setUserData(userData);
}

async function createNewUserData(user : User| null, fcmToken : string) {
  try {
    const position = await getLocation();
    const userData = {
      latitude: position?.coords.latitude.toString(),
      longitude: position?.coords.longitude.toString(),
      notificationToken: fcmToken,
      userId: user?.id || "",
    };
    const createdUserData = await UserData.createUserData(userData);
    if (!createdUserData) {
      throw new Error('Failed to create user data');
    }
    localStorage.setItem('user_data_id', createdUserData.id);
    useUserDataStore.getState().setUserData(createdUserData);
  } catch (error) {
    console.error('Location permission not granted or other error:', error);
  }
}
