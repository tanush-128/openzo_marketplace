// import 'dart:convert';
// import 'package:http/http.dart' as http;
// import 'package:openzo_frontend/constants/constants.dart';
// import 'package:openzo_frontend/models/product.dart';

// import 'package:shared_preferences/shared_preferences.dart';

// class Sale {
//   final int id;
//   final List<OrderItem> orderItems;
//   final Customer customer;
//   final DateTime orderDate;
//   final String orderTime;
//   final double totalAmount;
//   final int storeId;

//   Sale({
//     required this.id,
//     required this.orderItems,
//     required this.customer,
//     required this.orderDate,
//     required this.orderTime,
//     required this.totalAmount,
//     required this.storeId,
//   });

//   static Future<List<Sale>> getSales(int storeId) async {
//     var response = await http.get(
//         Uri.parse('${GlobalConsts.backend_url}/sale?store_id=$storeId'),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//         });
//     if (response.statusCode == 200) {
//       List<Sale> orders = [];
//       for (var order in jsonDecode(response.body)) {
//         orders.add(Sale.fromJson(order));
//       }

//       // jsonDecode(response.body).map((x) => Order.fromJson(x)).toList();
//       // print(jsonDecode(response.body));
//       return orders;
//     } else {
//       return [];
//     }
//   }

//   static Future<Sale> createSale(Sale order) async {
//     SharedPreferences prefs = await SharedPreferences.getInstance();
//     String? token = prefs.getString('token');
//     if (token == null) {
//       throw Exception('Token not found');
//     }
//     var response =
//         await http.post(Uri.parse('${GlobalConsts.backend_url}/sale/'),
//             headers: <String, String>{
//               'Content-Type': 'application/json; charset=UTF-8',
//               'Authorization': token,
//             },
//             body: jsonEncode({
//               'order_items': order.orderItems.map((e) => e.toJson()).toList(),
//               'customer': order.customer.toJson(),
//               'order_date': order.orderDate.toString(),
//               'order_time': order.orderTime,
//               'total_amount': order.totalAmount,
//               'store_id': order.storeId,
//             }));
//     if (response.statusCode == 200) {
//       return Sale.fromJson(jsonDecode(response.body));
//     } else {
//       return Sale(
//         id: 0,
//         orderItems: [],
//         customer:
//             Customer(id: 0, phone: '', address: '', userDataId: 0, saleId: 0),
//         orderDate: DateTime.now(),
//         orderTime: '',
//         totalAmount: 0.0,
//         storeId: 0,
//       );
//     }
//   }

//   factory Sale.fromJson(Map<String, dynamic> json) {
//     return Sale(
//       id: json['id'],
//       storeId: json['store_id'],
//       orderItems: List<OrderItem>.from(
//           json['order_items'].map((x) => OrderItem.fromJson(x))),
//       customer: Customer.fromJson(json['customer']),
//       orderDate: DateTime.parse(json['order_date']),
//       orderTime: json['order_time'],
//       totalAmount: json['total_amount'] * 1.0,
//     );
//   }

//   void add(Sale element) {}
// }

// // type Customer struct {
// // 	ID         int    `json:"id"`
// // 	Phone      string `json:"phone"`
// // 	Address    string `json:"address"`
// // 	UserDataId int    `json:"user_data_id"`
// // 	SaleId     int    `json:"sale_id"`
// // }

// class Customer {
//   int id;
//   String phone;
//   String address;
//   int userDataId;
//   int saleId;

//   Customer({
//     required this.id,
//     required this.phone,
//     required this.address,
//     required this.userDataId,
//     required this.saleId,
//   });

//   Map<String, dynamic> toJson() {
//     return {
//       'id': id,
//       'phone': phone,
//       'address': address,
//       'user_data_id': userDataId,
//       'sale_id': saleId,
//     };
//   }

//   factory Customer.fromJson(Map<String, dynamic> json) {
//     return Customer(
//       id: json['id'],
//       phone: json['phone'],
//       address: json['address'],
//       userDataId: json['user_data_id'],
//       saleId: json['sale_id'],
//     );
//   }
// }

// class OrderItemWithProduct {
//   OrderItem order;
//   Product product;

//   OrderItemWithProduct(this.order, this.product);
// }

// class OrderItem {
//   final int id;
//   final int productId;
//   final int orderId;
//   int quantity = 0;

//   OrderItem({
//     required this.id,
//     required this.productId,
//     required this.orderId,
//     this.quantity = 0,
//   });

//   Map<String, dynamic> toJson() {
//     return {
//       'id': id,
//       'product_id': productId,
//       'sale_id': orderId,
//       'quantity': quantity,
//     };
//   }

//   factory OrderItem.fromJson(Map<String, dynamic> json) {
//     return OrderItem(
//       id: json['id'],
//       productId: json['product_id'],
//       orderId: json['sale_id'],
//       quantity: json['quantity'],
//     );
//   }
// }

import axios from "axios";
import { GlobalConsts } from "~/constants/constants";

interface OrderItemData {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
}

export class OrderItem {
  public readonly id: number;
  public readonly productId: number;
  public readonly orderId: number;
  public readonly quantity: number;

  constructor(data: OrderItemData) {
    this.id = data.id;
    this.productId = data.productId;
    this.orderId = data.orderId;
    this.quantity = data.quantity;
  }

  public toJson(): OrderItemData {
    return {
      id: this.id,
      productId: this.productId,
      orderId: this.orderId,
      quantity: this.quantity,
    };
  }
}

interface CustomerData {
  id: number;
  phone: string;
  address: string;
  userDataId: number;
  saleId: number;
}

export class Customer {
  public readonly id: number;
  public readonly phone: string;
  public readonly address: string;
  public readonly userDataId: number;
  public readonly saleId: number;

  constructor(data: CustomerData) {
    this.id = data.id;
    this.phone = data.phone;
    this.address = data.address;
    this.userDataId = data.userDataId;
    this.saleId = data.saleId;
  }

  public toJson(): CustomerData {
    return {
      id: this.id,
      phone: this.phone,
      address: this.address,
      userDataId: this.userDataId,
      saleId: this.saleId,
    };
  }
}

interface SaleData {
  id: number;
  orderItems: OrderItemData[];
  customer: CustomerData;
  orderDate: string;
  orderTime: string;
  totalAmount: number;
  storeId: number;
}

export class Sale {
  public readonly id: number;
  public readonly orderItems: OrderItem[];
  public readonly customer: Customer;
  public readonly orderDate: Date;
  public readonly orderTime: string;
  public readonly totalAmount: number;
  public readonly storeId: number;

  constructor(data: SaleData) {
    this.id = data.id;
    this.orderItems = data.orderItems.map((item) => new OrderItem(item));
    this.customer = new Customer(data.customer);
    this.orderDate = new Date(data.orderDate);
    this.orderTime = data.orderTime;
    this.totalAmount = data.totalAmount;
    this.storeId = data.storeId;
  }

  static async getSales(storeId: number): Promise<Sale[]> {
    const sales: Sale[] = [];
    try {
      const response = await axios.get(
        `${GlobalConsts.backend_url}/sale?store_id=${storeId}`
      );
      if (response.status === 200) {
        const data: SaleData[] = response.data;
        data.forEach((sale) => {
          sales.push(new Sale(sale));
        });
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
    return sales;
  }

  static async createSale(sale: Sale): Promise<Sale> {
    try {
      const response = await axios.post(`${GlobalConsts.backend_url}/sale/`, {
        order_items: sale.orderItems.map((item) => item.toJson()),
        customer: sale.customer.toJson(),
        order_date: sale.orderDate.toISOString(),
        order_time: sale.orderTime,
        total_amount: sale.totalAmount,
        store_id: sale.storeId,
      });
      return new Sale(response.data);
    } catch (error) {
      console.error("Error creating sale:", error);
      return new Sale({
        id: 0,
        orderItems: [],
        customer: {
          id: 0,
          phone: "",
          address: "",
          userDataId: 0,
          saleId: 0,
        },
        orderDate: new Date().toISOString(),
        orderTime: "",
        totalAmount: 0,
        storeId: 0,
      });
    }
  }
}
