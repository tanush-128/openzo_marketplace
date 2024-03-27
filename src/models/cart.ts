// // package models

// // type Cart struct {
// // 	ID         int         `json:"id"`
// // 	OrderItems []OrderItem `json:"order_items"`
// // 	UserDataId int         `json:"user_data_id"`
// // 	StoreID    int         `json:"store_id"`
// // }

// import 'package:openzo_frontend/models/sale.dart';

// class Cart {
//   final int id;
//   List<OrderItem> orderItems;
//   final int userDataId;
//   final int storeId;
//   int total;

//   Cart({
//     required this.id,
//     required this.orderItems,
//     required this.userDataId,
//     required this.storeId,
//     required this.total,
//   });

//   Map<String, dynamic> toJson() {
//     return {
//       'id': id,
//       'order_items': orderItems.map((e) => e.toJson()).toList(),
//       'user_data_id': userDataId,
//       'store_id': storeId,
//       'total': total,
//     };
//   }

//   factory Cart.fromJson(Map<String, dynamic> json) {
//     return Cart(
//       id: json['id'],
//       orderItems: List<OrderItem>.from(
//           json['order_items'].map((x) => OrderItem.fromJson(x))),
//       userDataId: json['user_data_id'],
//       storeId: json['store_id'],
//       total: json['total'],
//     );
//   }
// }


import axios from "axios";
import { GlobalConsts } from "~/constants/constants";
import { OrderItem } from "./sale";

interface CartData {
  id: number;
  orderItems: OrderItem[];
  userDataId: number;
  storeId: number;
}

export class Cart {
  public readonly id: number;
  public readonly orderItems: OrderItem[];
  public readonly userDataId: number;
  public readonly storeId: number;

  constructor(data: CartData) {
    this.id = data.id;
    this.orderItems = data.orderItems.map(item => new OrderItem(item));
    this.userDataId = data.userDataId;
    this.storeId = data.storeId;
  }

  static async fetchOne(id: number): Promise<Cart | null> {
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/cart/${id}`);
      if (response.status === 200) {
        return new Cart(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
    return null;
  }
}
