// services/UserData.ts

import GlobalConsts from "~/constants/constants";

// interface UserData {
//   id: string;
//   userId: string;
//   latitude: string;
//   longitude: string;
//   address: string;
//   pincode: string;
//   city: string;
//   state: string;
//   country: string;
//   notificationToken: string;
// }

const BACKEND_URL = GlobalConsts.backend_url;

class UserData {

  constructor(
    public id: string,
    public userId: string,
    public latitude: string,
    public longitude: string,
    public address: string,
    public pincode: string,
    public city: string,
    public state: string,
    public country: string,
    public notificationToken: string
  ) { }       

  static async createUserData(userData: Partial<UserData>): Promise<UserData | null> {
    const res = await fetch(`${BACKEND_URL}/users/userdata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        user_id: userData.userId,
        latitude: userData.latitude,
        longitude: userData.longitude,
        address: userData.address,
        pincode: userData.pincode,
        notification_token: userData.notificationToken,
      }),
    });

    if (res.status === 201) {
      const data: UserData = await res.json();
      localStorage.setItem('user_data_id', data.id);
      return data;
    } else {
      console.error('Failed to create user data', await res.text());
      return null;
    }
  }

  static async getUserData(userDataId: string): Promise<UserData> {
    const res = await fetch(`${BACKEND_URL}/users/userdata/${userDataId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      throw new Error(`Failed to load user data: ${await res.text()}`);
    }
  }


static async getUserDataByUserID(userId: string): Promise<UserData> {
    const res = await fetch(`${BACKEND_URL}/users/userdata/user/${userId}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        },
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw new Error(`Failed to load user data: ${await res.text()}`);
    }
}

  static async updateUserData(userData: Partial<UserData>): Promise<UserData> {
    const res = await fetch(`${BACKEND_URL}/users/userdata`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        id: userData.id,
        user_id: userData.userId,
        latitude: userData.latitude,
        longitude: userData.longitude,
        address: userData.address,
        pincode: userData.pincode,
        notification_token: userData.notificationToken,
      }),
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      throw new Error(`Failed to update user data: ${await res.text()}`);
    }
  }
}

export default UserData;
