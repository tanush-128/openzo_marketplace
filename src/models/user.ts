import GlobalConsts from "~/constants/constants";

type UserJson = {
  ID: string;
  Name: string;
  Email: string;
  Phone: string;
};

class User {
  id: string;
  phone: string;
  name: string;
  email: string;

  constructor(id: string, phone: string, name: string = "", email: string = "") {
    this.id = id;
    this.phone = phone;
    this.name = name;
    this.email = email;
  }

  static fromJson(json: UserJson): User {
    return new User(json.ID, json.Phone, json.Name, json.Email);
  }

  static async getUserWithJWT(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${GlobalConsts.backend_url}/users/jwt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': token,
      },
    });

    if (response.status === 200) {
      const user = await response.json();
      return User.fromJson(user);
    } else {
      localStorage.removeItem('token');
      throw new Error('Failed to load user');
    }
  }

  static async signIn(mobile: string): Promise<boolean> {
    const response = await fetch(`${GlobalConsts.backend_url}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ mobile: mobile, otp: '' }),
    });

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log('JWT Token:', data.token);
      return true;
    } else {
      const errorData = await response.json();
      try {
        await User.addUser(new User('', mobile));
        return await User.signIn(mobile);
      } catch (e) {
        throw new Error(errorData.error);
      }
    }
  }

  static async addUser(user: User): Promise<User> {
    const response = await fetch(`${GlobalConsts.backend_url}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phone,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return User.fromJson(data);
    }

    const errorData = await response.json();
    throw new Error(errorData.error);
  }
}


export default User;