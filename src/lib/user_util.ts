// import User from '~/models/user';
// import UserData from '~/models/user_data';
// import useUserDataStore from '~/providers/userDataStore';
// import useUserStore from '~/providers/userStore';
// import { getLocation } from '~/services/LocationService';

// export async function handleUserLogin( mobileNo : string) {
//   try {
//     const isSignedIn = await User.signIn(mobileNo);
//     if (isSignedIn) {
//       const user = await  User.getUserWithJWT();
//       useUserStore.getState().setUser(user);
//       return user;
//     }
//     throw new Error('Failed to sign in');
//   } catch (error) {
//     console.error(error);
//     throw new Error('Login failed: ');
//   }
// }

// export async function handleUserData(mobileNo : string | null) {
//   const fcmToken = localStorage.getItem('fcmToken');
//   const userDataId = localStorage.getItem('user_data_id');

//   if (mobileNo == null || mobileNo === "") {
//     if (!userDataId) {
//       await createNewUserData(null, fcmToken ?? "");
//     } else {
//       console.log('UserData Id: ', userDataId);
//       const userData = await UserData.getUserData(userDataId);
//       await updateUserDataContext(userData, null, fcmToken ?? "");
//     }
//   } else {
//     const user = await handleUserLogin(mobileNo);

//     try {
//       const userData = await UserData.getUserDataByUserID(user.id);
//       await updateUserDataContext(userData, user, fcmToken ?? "");
//       console.log('User data already exists');
//     } catch (error) {
//       console.error(error);
//       await createNewUserData(user, fcmToken??"");
//     }
//   }
// }

// async function updateUserDataContext(userData : UserData, user : User | null, fcmToken :string) {
//   if (userData.notificationToken !== fcmToken || userData.userId !== user?.id) {
//     userData.notificationToken = fcmToken;
//     userData.userId = user?.id || "";

//     userData = await UserData.updateUserData(userData);
//   }
//   localStorage.setItem('user_data_id', userData.id);
//   useUserDataStore.getState().setUserData(userData);
// }

// async function createNewUserData(user : User| null, fcmToken : string) {
//   try {
//     const position = await getLocation();
//     const userData = {
//       latitude: position?.coords.latitude.toString(),
//       longitude: position?.coords.longitude.toString(),
//       notificationToken: fcmToken,
//       userId: user?.id || "",
//     };
//     const createdUserData = await UserData.createUserData(userData);
//     if (!createdUserData) {
//       throw new Error('Failed to create user data');
//     }
//     localStorage.setItem('user_data_id', createdUserData.id);
//     useUserDataStore.getState().setUserData(createdUserData);
//   } catch (error) {
//     console.error('Location permission not granted or other error:', error);
//   }
// }

import { User } from "~/models/user";
import useUserStore from "~/providers/userStore";
import { getLocation } from "~/services/LocationService";

export async function handleUserData() {
  const fcmToken = localStorage.getItem("fcmToken");
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  let user: User;
  user = await User.getUserWithJWT();

  useUserStore.getState().setUser(user);
  localStorage.setItem("user_id", user.id);
}

// async function updateUserData(user: User, fcmToken: string): Promise<User> {
//   if (user.notificationToken !== fcmToken || !user.address) {
//     user.notificationToken = fcmToken;
//     let position = await getLocation();
//     if (!position) {
//       console.log("Location permission not granted");
//       // position = await showLocationPermissionBottomSheet(context);
//     }

//     if (position) {
//       user.latitude = position.coords.latitude.toString();
//       user.longitude = position.coords.longitude.toString();
//       user = await User.updateUser(user);
//     }
//   }

//   return user;
// }

// async function createUser(
//   phone: string | null,
//   fcmToken: string,
// ): Promise<User> {
//   let position = await getLocation();
//   if (!position) {
//     console.log("Location permission not granted");
//     // position = await showLocationPermissionBottomSheet(context);
//   }

//   if (position) {
//     const user = new User({
//       id: "",
//       phone: phone ?? "",
//       latitude: position.coords.latitude.toString(),
//       longitude: position.coords.longitude.toString(),
//       notificationToken: fcmToken,
//       isVerified: false,
//     });
//     return await User.registerUser(user);
//   }

//   throw new Error("Location permission not granted");
// }
