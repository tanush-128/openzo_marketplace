// // type User struct {
// // 	gorm.Model
// // 	UserName string `json:"username"`
// // 	Email    string `json:"email"`
// // 	Password string `json:"password"`
// // Phone    string `json:"phone"`

// // }

// import 'dart:convert';
// import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'package:openzo_frontend/constants/constants.dart';
// import 'package:openzo_frontend/providers/user_provider.dart';

// import 'package:provider/provider.dart';
// import 'package:shared_preferences/shared_preferences.dart';

// class User {
//   final String userName;
//   final String email;
//   final String password;
//   final String phone;

//   final int id;

//   User({
//     required this.id,
//     required this.userName,
//     required this.email,
//     required this.password,
//     required this.phone,
//   });

//   factory User.fromJson(Map<String, dynamic> json) {
//     return User(
//       id: json['ID'],
//       userName: json['username'],
//       email: json['email'],
//       password: json['password'],
//       phone: json['phone'],
//     );
//   }

//   static getUserWithJWT(BuildContext context) async {
//     SharedPreferences prefs = await SharedPreferences.getInstance();
//     String? token = prefs.getString('token');
//     if (token == null) {
//       Navigator.popAndPushNamed(context, '/login');

//       return;
//     }

//     http.get(Uri.parse('${GlobalConsts.backend_url}/user/with_token/'),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//           'Authorization': token,
//         }).then((response) {
//       if (response.statusCode == 200) {
//         User user = User.fromJson(jsonDecode(response.body));

//         print(response.body);

//         Provider.of<UserProvider>(context, listen: false).setUser(user);
//         Navigator.popAndPushNamed(context, '/home');
//       } else {
//         Navigator.popAndPushNamed(context, '/login');
//       }
//     });
//   }

//   static SignIn(
//     String email,
//     String password,
//   ) async {
//     http.Response res =
//         await http.post(Uri.parse('${GlobalConsts.backend_url}/user/sign_in'),
//             headers: <String, String>{
//               'Content-Type': 'application/json; charset=UTF-8',
//               // 'Authorization
//             },
//             body: jsonEncode({
//               'email': email,
//               'password': password,
//             }));
//     if (res.statusCode == 200) {
//       SharedPreferences prefs = await SharedPreferences.getInstance();
//       prefs.setString('token', jsonDecode(res.body)['token']);
//       print(jsonDecode(res.body)['token']);
//       return true;
//     } else {
//       return false;
//     }
//   }

//   static addUser(User user) {
//     http.post(Uri.parse('${GlobalConsts.backend_url}/user/'),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//           // 'Authorization': GlobalConsts.token,
//         },
//         body: jsonEncode({
//           'username': user.userName,
//           'email': user.email,
//           'password': user.password,
//           'phone': user.phone,
//         }));
//   }
// }

import axios from "axios";
import { GlobalConsts } from "~/constants/constants";

export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  phone: string;
}

export class User {
  public id: number;
  public userName: string;
  public email: string;
  public password: string;
  public phone: string;

  constructor(data: User) {
    this.id = data.id;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
  }

  static async getUserWithJWT(): Promise<User> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(
      `${GlobalConsts.backend_url}/user/with_token/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      return new User(response.data);
    } else {
      throw new Error("Failed to get user");
    }
  }

  static async signIn(email: string, password: string): Promise<boolean> {
    const response = await axios.post(
      `${GlobalConsts.backend_url}/user/sign_in`,
      {
        email,
        password,
      }
    );

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      return true;
    } else {
      return false;
    }
  }

  static async addUser(user: User): Promise<void> {
    await axios.post(`${GlobalConsts.backend_url}/user/`, user);
  }
}
