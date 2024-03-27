// // type Product struct {
// // 	ID          int            `json:"id"`
// // 	Name        string         `json:"name"`
// // 	Description string         `json:"description"`
// // 	Price       int            `json:"price"`
// // 	Quantity    int            `json:"quantity"`
// // 	Images      []ProductImage `json:"images"`
// // 	Category    string         `json:"category"`
// // Barcode     string         `json:"barcode"`

// // 	StoreID     int            `json:"store_id"`
// // }

// // type ProductImage struct {
// // 	ID        int    `json:"id"`
// // 	ProductID int    `json:"product_id"`
// // 	Image     string `json:"image" gorm:"type:text"`
// // }

// // type Category struct {
// // 	ID      int    `json:"id"`
// // 	Name    string `json:"name"`
// // 	StoreID int    `json:"store_id"`
// // }

// import 'dart:convert';

// import 'package:http/http.dart' as http;
// import 'package:openzo_frontend/constants/constants.dart';

// class Product {
//   final int id;
//   final String name;
//   final String description;
//   final int mrp;
//   int msrp = 0;
//   int discountPrice = 0;
//   final int quantity;
//   final List<ProductImage> images;
//   final String category;
//   final int storeID;
//   final String barcode;

//   Product({
//     required this.id,
//     required this.name,
//     required this.description,
//     required this.mrp,
//     required this.msrp,
//     required this.discountPrice,
//     required this.quantity,
//     required this.images,
//     required this.category,
//     required this.storeID,
//     required this.barcode,
//   });

//   static Future<List<Product>> fetchMany(int storeID) async {
//     List<Product> products = [];
//     // fetch products from the server
//     http.Request req = http.Request('GET',
//         Uri.parse('${GlobalConsts.backend_url}/product/?store_id=$storeID'));
//     http.StreamedResponse res = await req.send();

//     String body = await res.stream.bytesToString();

//     var products0 = json.decode(body);
//     // print(_products);
//     products0.forEach((product) {
//       products = [...products, Product.fromJson(product)];
//     });

//     return products;
//   }

//   static Future<Product> fetchOne(int productID) async {
//     // fetch products from the server
//     http.Request req = http.Request(
//         'GET', Uri.parse('${GlobalConsts.backend_url}/product/$productID'));
//     http.StreamedResponse res = await req.send();

//     String body = await res.stream.bytesToString();

//     var product = json.decode(body);

//     return Product.fromJson(product);
//   }

//   static getItemsByOrderId(int orderId) async {
//     List<Product> products = [];
//     http.Response res = await http.get(
//       Uri.parse('${GlobalConsts.backend_url}/product/?order_id=$orderId'),
//       headers: <String, String>{
//         'Content-Type': 'application/json',
//         'Authorization': GlobalConsts.token,
//       },
//     );
//     print(res.body);
//     if (res.statusCode == 200) {
//       for (var product in jsonDecode(res.body)) {
//         products.add(Product.fromJson(product));
//       }
//       return products;
//     } else {
//       return null;
//     }
//   }

//   static Future<List<Product>> searchProducts(
//       String pincode, String nameContains) async {
//     List<Product> products = [];
//     http.Response res = await http.get(
//       Uri.parse(
//           '${GlobalConsts.backend_url}/product/?pincode=$pincode&name_contains=$nameContains'),
//       headers: <String, String>{
//         'Content-Type': 'application/json',
//         'Authorization': GlobalConsts.token,
//       },
//     );
//     print(res.body);
//     if (res.statusCode == 200) {
//       for (var product in jsonDecode(res.body)) {
//         products.add(Product.fromJson(product));
//       }
//       return products;
//     } else {
//       return [];
//     }
//   }

//   factory Product.fromJson(Map<String, dynamic> json) {
//     return Product(
//       id: json['id'],
//       name: json['name'],
//       description: json['description'],
//       mrp: json['mrp'],
//       msrp: json['msrp'],
//       discountPrice: json['discount_price'],
//       quantity: json['quantity'],
//       barcode: json['barcode'],
//       images: (json['images'] as List)
//           .map((image) => ProductImage.fromJson(image))
//           .toList(),
//       category: json['category'],
//       storeID: json['store_id'],
//     );
//   }

//   Map<String, dynamic> toJson() {
//     Product product = this;
//     return {
//       'id': product.id,
//       'name': product.name,
//       'description': product.description,
//       'mrp': product.mrp,
//       'msrp': product.msrp,
//       'discount_price': product.discountPrice,
//       'quantity': product.quantity,
//       'barcode': product.barcode,
//       'images':
//           product.images.map((e) => {'id': e.id, 'image': e.image}).toList(),
//       'category': product.category,
//       'store_id': product.storeID,
//     };
//   }
// }

// class ProductImage {
//   final int id;
//   final int productID;
//   final String image;

//   ProductImage({
//     required this.id,
//     required this.productID,
//     required this.image,
//   });

//   factory ProductImage.fromJson(Map<String, dynamic> json) {
//     return ProductImage(
//       id: json['id'],
//       productID: json['product_id'],
//       image: json['image'],
//     );
//   }
// }

import axios from "axios";

import { GlobalConsts } from "~/constants/constants";

interface ProductData {
  id: number;
  name: string;
  description: string;
  mrp: number;
  msrp: number;
  discount_price: number;
  quantity: number;
  images: ProductImageData[];
  category: string;
  storeID: number;
  barcode: string;
}

interface ProductImageData {
  id: number;
  productID: number;
  image: string;
}

export class Product {
  public readonly id: number;
  public readonly name: string;
  public readonly description: string;
  public readonly mrp: number;
  public readonly msrp: number;
  public readonly discount_price: number;
  public readonly quantity: number;
  public readonly images: ProductImage[];
  public readonly category: string;
  public readonly storeID: number;
  public readonly barcode: string;

  constructor(data: ProductData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.mrp = data.mrp;
    this.msrp = data.msrp;
    this.discount_price = data.discount_price;
    this.quantity = data.quantity;
    this.images = data.images.map((image) => new ProductImage(image));
    this.category = data.category;
    this.storeID = data.storeID;
    this.barcode = data.barcode;
  }

  static async fetchMany(storeID: number): Promise<Product[]> {
    const products: Product[] = [];
    try {
      const response = await axios.get(
        `${GlobalConsts.backend_url}/product/?store_id=${storeID}`
      );
      if (response.status === 200) {
        const data: ProductData[] = response.data;
        data.forEach((product) => {
          products.push(new Product(product));
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    return products;
  }

  static async fetchOne(productID: number): Promise<Product> {
    let product: Product | null = null;
    try {
      const response = await axios.get(
        `${GlobalConsts.backend_url}/product/${productID}`
      );
      if (response.status === 200) {
        product = new Product(response.data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    return product!;
  }

  static async getItemsByOrderId(orderId: number): Promise<Product[]> {
    const products: Product[] = [];
    try {
      const response = await axios.get(
        `${GlobalConsts.backend_url}/product/?order_id=${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: GlobalConsts.token,
          },
        }
      );
      if (response.status === 200) {
        response.data.forEach((product: ProductData) => {
          products.push(new Product(product));
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    return products;
  }

  static async searchProducts(
    pincode: string,
    nameContains: string
  ): Promise<Product[]> {
    const products: Product[] = [];
    try {
      const response = await axios.get(
        `${GlobalConsts.backend_url}/product/?pincode=${pincode}&name_contains=${nameContains}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: GlobalConsts.token,
          },
        }
      );
      if (response.status === 200) {
        response.data.forEach((product: ProductData) => {
          products.push(new Product(product));
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    return products;
  }

  static async fetchByCategory(category: string): Promise<Product[]> {
    const products: Product[] = [];
    try {
      const response = await axios.get(
        `${GlobalConsts.backend_url}/product/?category=${category}`
      );
      if (response.status === 200) {
        response.data.forEach((product: ProductData) => {
          products.push(new Product(product));
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    return products;
  }

  static async fetchByStore(storeID: number): Promise<Product[]> {
    const products: Product[] = [];
    try {
      const response = await axios.get(
        `${GlobalConsts.backend_url}/product/?store_id=${storeID}`
      );
      if (response.status === 200) {
        response.data.forEach((product: ProductData) => {
          products.push(new Product(product));
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    return products;
  }

  static async fetchByBarcode(barcode: string): Promise<Product | null> {
    let product: Product | null = null;
    try {
      const response = await axios.get(
        `${GlobalConsts.backend_url}/product/?barcode=${barcode}`
      );
      if (response.status === 200) {
        product = new Product(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    return product;
  }

  static async update(product: Product): Promise<void> {
    try {
      await axios.put(
        `${GlobalConsts.backend_url}/product/${product.id}`,
        product
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  static async create(product: Product): Promise<void> {
    try {
      await axios.post(`${GlobalConsts.backend_url}/product`, product);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }
}

export class ProductImage {
  public readonly id: number;
  public readonly productID: number;
  public readonly image: string;

  constructor(data: ProductImageData) {
    this.id = data.id;
    this.productID = data.productID;
    this.image = data.image;
  }
}
