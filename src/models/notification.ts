// // type Notification struct {
// // 	gorm.Model
// // 	StoreID int    `json:"store_id"`
// // 	Title   string `json:"title"`
// // 	Message string `json:"message"`
// // 	Image   string `json:"image"`
// // 	Pincode string `json:"pincode"`
// // 	// ScheduledAt time.Time `json:"scheduled_at"`
// // }

// import 'dart:convert';
// import 'package:http/http.dart' as http;
// import 'package:openzo_frontend/constants/constants.dart';

// class NotificationByte {
//   final int id;
//   final int storeID;
//   final String title;
//   final String message;
//   final String image;
//   final String pincode;
//   // final DateTime scheduledAt;

//   NotificationByte({
//     required this.id,
//     required this.storeID,
//     required this.title,
//     required this.message,
//     required this.image,
//     required this.pincode,
//     // required this.scheduledAt,
//   });

//   factory NotificationByte.fromJson(Map<String, dynamic> json) {
//     return NotificationByte(
//       id: json['ID'],
//       storeID: json['store_id'],
//       title: json['title'],
//       message: json['message'],
//       image: json['image'],
//       pincode: json['pincode'],
//       // scheduledAt: DateTime.parse(json['scheduled_at']),
//     );
//   }

//   static Future<List<NotificationByte>> fetchMany(String pincode) async {
//     List<NotificationByte> notifications = [];
//     // fetch notifications from the server
//     http.Request req = http.Request(
//         'GET',
//         Uri.parse(
//             '${GlobalConsts.backend_url}/notification/?pincode=$pincode'));
//     http.StreamedResponse res = await req.send();

//     if (res.statusCode == 200) {
//       String body = await res.stream.bytesToString();
//       List<dynamic> data = jsonDecode(body);
//       for (var notification in data) {
//         notifications.add(NotificationByte.fromJson(notification));
//       }
//     }

//     return notifications;
//   }
// }


import axios from 'axios';
import GlobalConsts from '~/constants/constants';

interface NotificationData {
  id: number;
  storeID: number;
  title: string;
  message: string;
  image: string;
  pincode: string;
}

export class Notification {
  public readonly id: number;
  public readonly storeID: number;
  public readonly title: string;
  public readonly message: string;
  public readonly image: string;
  public readonly pincode: string;

  constructor(data: NotificationData) {
    this.id = data.id;
    this.storeID = data.storeID;
    this.title = data.title;
    this.message = data.message;
    this.image = data.image;
    this.pincode = data.pincode;
  }

  static async fetchMany(pincode: string): Promise<Notification[]> {
    const notifications: Notification[] = [];
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/notification/?pincode=${pincode}`);
      if (response.status === 200) {
        const data: NotificationData[] = response.data;
        data.forEach(notification => {
          notifications.push(new Notification(notification));
        });
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
    return notifications;
  }
}