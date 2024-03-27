// import 'dart:convert';
// import 'dart:developer';

// import 'package:http/http.dart' as http;
// import 'package:openzo_frontend/constants/constants.dart';

// enum StoreType {
//   general_store,
//   stationery,
//   electronics,
//   fashion,
//   footwear,
//   accessories,
//   rental,
//   grocery,
//   beauty,
//   sports,
// }

// class Store {
//   final String name;
//   final String userEmail;
//   final String image;
//   final String location;
//   bool onlineDiscovery;
//   final bool selfDeliveryService;
//   final String pincode;
//   final String phone;
//   final String description;
//   final String address;
//   final String openingTime;
//   final String closingTime;
//   final int id;
//   final StoreType storeType;

//   Store({
//     required this.id,
//     required this.name,
//     required this.phone,
//     required this.userEmail,
//     required this.pincode,
//     required this.address,
//     required this.location,
//     required this.openingTime,
//     required this.description,
//     required this.closingTime,
//     required this.image,
//     required this.onlineDiscovery,
//     required this.selfDeliveryService,
//     required this.storeType,
//   });

//   static getStoreWithUserEmail(String userEmail) async {
//     var response = await http.get(
//         Uri.parse('${GlobalConsts.backend_url}/store/?user_email=$userEmail'),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//           'Authorization': GlobalConsts.token,
//         });
//     if (response.statusCode == 200) {
//       print(response.body);
//       return Store.fromJson(jsonDecode(response.body));
//     } else {
//       return null;
//     }
//   }

//   static Future<Store> fetchStore(int storeId) async {
//     var response = await http.get(
//         Uri.parse('${GlobalConsts.backend_url}/store/$storeId'),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//           // 'Authorization': GlobalConsts.token,
//         });
//     if (response.statusCode == 200) {
//       return Store.fromJson(jsonDecode(response.body));
//     } else {
//       throw Exception('Failed to load store');
//     }
//   }

//   static Future<List<Store>> getStoresWithPincode(String pincode) async {
//     var response = await http.get(
//         Uri.parse('${GlobalConsts.backend_url}/store/?pincode=$pincode'),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//         });
//     // 'Authorization': GlobalConsts.token,
//     if (response.statusCode == 200) {
//       List<Store> stores = [];
//       for (var store in jsonDecode(response.body)) {
//         stores.add(Store.fromJson(store));
//       }
//       log(stores.toString());
//       return stores;
//     } else {
//       print(response.body);
//       return [];
//     }
//   }

//   Map<String, dynamic> toJson() {
//     return {
//       'id': id,
//       'name': name,
//       'phone': phone,
//       'user_email': userEmail,
//       'pincode': pincode,
//       'address': address,
//       'location': location,
//       'opening_time': openingTime,
//       'closing_time': closingTime,
//       'description': description,
//       'image': image,
//       'online_discovery': onlineDiscovery,
//       'self_delivery_service': selfDeliveryService,
//       'store_type': storeType.toString().split('.').last,
//     };
//   }

//   static Future<List<Store>> getStoreByPincodeAndCategory(
//       String pincode, String category) async {
//     // var response = await http.get(
//     //     Uri.parse(
//     //         '${GlobalConsts.backend_url}/store?pincode=$pincode&store_type=$category'),
//     //     headers: <String, String>{
//     //       'Content-Type': 'application/json; charset=UTF-8',
//     //       'Authorization': GlobalConsts.token,
//     //     });
//     http.Request req = http.Request(
//         'GET',
//         Uri.parse(
//             '${GlobalConsts.backend_url}/store/?pincode=$pincode&store_type=$category'));

//     http.StreamedResponse response = await req.send();
//     if (response.statusCode == 200) {
//       List<Store> stores = [];
//       var body = await response.stream.bytesToString();
//       for (var store in jsonDecode(body)) {
//         stores.add(Store.fromJson(store));
//       }
//       return stores;
//     } else {
//       return [];
//     }
//   }

//   static Future<List<Store>> searchStores(
//       String pincode, String nameContains) async {
//     List<Store> stores = [];
//     http.Response res = await http.get(
//       Uri.parse(
//           '${GlobalConsts.backend_url}/store/?pincode=$pincode&name_contains=$nameContains'),
//       headers: <String, String>{
//         'Content-Type': 'application/json',
//         'Authorization': GlobalConsts.token,
//       },
//     );
//     print(res.body);
//     if (res.statusCode == 200) {
//       for (var store in jsonDecode(res.body)) {
//         stores.add(Store.fromJson(store));
//       }
//       return stores;
//     } else {
//       return [];
//     }
//   }

//   factory Store.fromJson(Map<String, dynamic> json) {
//     return Store(
//       id: json['ID'],
//       address: json['address'],
//       phone: json['phone'],
//       pincode: json['pincode'],
//       name: json['name'],
//       userEmail: json['user_email'],
//       image: json['image'],
//       location: json['location'],
//       openingTime: json['opening_time'],
//       closingTime: json['closing_time'],
//       onlineDiscovery: json['online_discovery'],
//       selfDeliveryService: json['self_delivery_service'],
//       description: json['description'],
//       storeType: StoreType.values
//           .firstWhere((e) => e.toString() == 'StoreType.${json['store_type']}'),
//     );
//   }
// }

import axios from "axios";
import { GlobalConsts } from "~/constants/constants";

export enum StoreType {
  general_store = "general_store",
  stationery = "stationery",
  electronics = "electronics",
  fashion = "fashion",
  footwear = "footwear",
  accessories = "accessories",
  rental = "rental",
  grocery = "grocery",
  beauty = "beauty",
  sports = "sports",
}

export interface StoreData {
  name: string;
  userEmail: string;
  image: string;
  location: string;
  onlineDiscovery: boolean;
  selfDeliveryService: boolean;
  pincode: string;
  phone: string;
  description: string;
  address: string;
  openingTime: string;
  closingTime: string;
  ID: number;
  store_type: string;
}

export class Store {
  public readonly name: string;
  public readonly userEmail: string;
  public readonly image: string;
  public readonly location: string;
  public readonly onlineDiscovery: boolean;
  public readonly selfDeliveryService: boolean;
  public readonly pincode: string;
  public readonly phone: string;
  public readonly description: string;
  public readonly address: string;
  public readonly openingTime: string;
  public readonly closingTime: string;
  public readonly ID: number;
  public readonly store_type: string;

  constructor(data: StoreData) {
    this.name = data.name;
    this.userEmail = data.userEmail;
    this.image = data.image;
    this.location = data.location;
    this.onlineDiscovery = data.onlineDiscovery;
    this.selfDeliveryService = data.selfDeliveryService;
    this.pincode = data.pincode;
    this.phone = data.phone;
    this.description = data.description;
    this.address = data.address;
    this.openingTime = data.openingTime;
    this.closingTime = data.closingTime;
    this.ID = data.ID;
    this.store_type = data.store_type;
  }

  static async getStoreWithUserEmail(userEmail: string): Promise<Store | null> {
    const response = await axios.get(
      `${GlobalConsts.backend_url}/store/?user_email=${userEmail}`,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: GlobalConsts.token,
        },
      }
    );
    if (response.status === 200) {
      // response.data.store_type = StoreType[response.data.store_type];
      var store = new Store(response.data);

      return store;
    } else {
      return null;
    }
  }

  static async fetchStore(storeId: number): Promise<Store> {
    const response = await axios.get(
      `${GlobalConsts.backend_url}/store/${storeId}`,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          // 'Authorization': GlobalConsts.token,
        },
      }
    );
    if (response.status === 200) {
      return new Store(response.data);
    } else {
      throw new Error("Failed to load store");
    }
  }

  static async getStoresWithPincode(pincode: string): Promise<Store[]> {
    const response = await axios.get(
      `${GlobalConsts.backend_url}/store/?pincode=${pincode}`,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    // 'Authorization
    if (response.status === 200) {
      return response.data.map((store: StoreData) => new Store(store));
    } else {
      return [];
    }
  }

  static async getStoreByPincodeAndCategory(
    pincode: string,
    category: string
  ): Promise<Store[]> {
    const response = await axios.get(
      `${GlobalConsts.backend_url}/store/?pincode=${pincode}&store_type=${category}`
    );
    if (response.status === 200) {
      return response.data.map((store: StoreData) => new Store(store));
    } else {
      return [];
    }
  }

  static async searchStores(
    pincode: string,
    nameContains: string
  ): Promise<Store[]> {
    const response = await axios.get(
      `${GlobalConsts.backend_url}/store/?pincode=${pincode}&name_contains=${nameContains}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: GlobalConsts.token,
        },
      }
    );
    if (response.status === 200) {
      return response.data.map((store: StoreData) => new Store(store));
    } else {
      return [];
    }
  }

  public toJson(): StoreData {
    return {
      name: this.name,
      userEmail: this.userEmail,
      image: this.image,
      location: this.location,
      onlineDiscovery: this.onlineDiscovery,
      selfDeliveryService: this.selfDeliveryService,
      pincode: this.pincode,
      phone: this.phone,
      description: this.description,
      address: this.address,
      openingTime: this.openingTime,
      closingTime: this.closingTime,
      ID: this.ID,
      store_type: this.store_type,
    };
  }

  public static fromJson(json: StoreData): Store {
    return new Store(json);
  }
}
