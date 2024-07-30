import axios from "axios";
import GlobalConsts from "~/constants/constants";

class User {
  id: string;
  email?: string;
  name?: string;
  phone: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
  notificationToken?: string;
  isVerified: boolean;

  static endpoint = `${GlobalConsts.backend_url}/users`;

  constructor({
    id,
    email,
    name,
    phone,
    latitude,
    longitude,
    address,
    pincode,
    city,
    state,
    country,
    notificationToken,
    isVerified = false,
  }: {
    id: string;
    email?: string;
    name?: string;
    phone: string;
    latitude?: string;
    longitude?: string;
    address?: string;
    pincode?: string;
    city?: string;
    state?: string;
    country?: string;
    notificationToken?: string;
    isVerified?: boolean;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
    this.pincode = pincode;
    this.city = city;
    this.state = state;
    this.country = country;
    this.notificationToken = notificationToken;
    this.isVerified = isVerified;
  }

  static fromJson(json: any): User {
    return new User({
      id: json.id,
      email: json.email,
      name: json.name,
      phone: json.phone,
      latitude: json.latitude,
      longitude: json.longitude,
      address: json.address,
      pincode: json.pincode,
      city: json.city,
      state: json.state,
      country: json.country,
      notificationToken: json.notification_token,
      isVerified: json.is_verified,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      phone: this.phone,
      latitude: this.latitude,
      longitude: this.longitude,
      address: this.address,
      pincode: this.pincode,
      city: this.city,
      state: this.state,
      country: this.country,
      notification_token: this.notificationToken,
      is_verified: this.isVerified,
      password: "",
    };
  }

  static async getUserWithJWT(): Promise<User> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(`${User.endpoint}/jwt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    });

    if (response.ok) {
      const userJson = await response.json();
      console.log("User:", userJson.pincode, userJson.city, userJson.state);
      return User.fromJson(userJson);
    } else {
      localStorage.removeItem("token");
      throw new Error("Failed to load user");
    }
  }

  static async registerUser(user: User): Promise<User> {
    console.log("Registering user:", user.toJson());
    // use axios instead of fetch
    // const response = await axios.post(User.endpoint + "/", user.toJson());

    const response = await fetch(User.endpoint + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user.toJson()),
    });

    if (response.ok) {
      console.log("Response:");
      // localStorage.setItem("token", response.data.token);
      // console.log("JWT Token:", response.data.token);
      // const user = User.fromJson(response.data.user);

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("JWT Token:", data.token);
      const user = User.fromJson(data.user);

      console.log("User:", user);
      return user;
    }

    throw new Error("Failed to register user");
    // throw new Error(data.error);

    // const response = await fetch(User.endpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json; charset=UTF-8',
    //   },

    //   body: JSON.stringify(user.toJson()),
    // });

    // if (response.status === 201) {
    //   const data = await response.json();
    //   localStorage.setItem('token', data.token);
    //   console.log('JWT Token:', data.token);
    //   return User.fromJson(data.user);
    // }

    // const errorData = await response.json();
    // throw new Error(errorData.error);
  }

  static async updateUser(user: User): Promise<User> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(User.endpoint + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: token,
      },
      body: JSON.stringify(user.toJson()),
    });

    if (response.ok) {
      return User.fromJson(await response.json());
    }

    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  static async verifyOTP(
    mobile: string,
    verificationId: string,
    otp: string,
    userId: string,
  ): Promise<string> {
    const response = await fetch(`${User.endpoint}/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        phone_no: mobile,
        otp: otp,
        verification_id: verificationId,
        user_id: userId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("JWT Token:", data.token);
      return data.token;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  }

  static async generateOTP(mobile: string): Promise<string> {
    const response = await fetch(`${User.endpoint}/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ phone_no: mobile }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.verification_id;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  }
}

export { User };
