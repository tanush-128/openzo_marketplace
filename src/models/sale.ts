// models/types.ts

export interface Customer {
  id: number;
  phone: string;
  address: string;
  userDataId: string;
  saleId: string;
}

export interface OrderItem {
  id: number;
  product_id: string;
  order_id: string;
  quantity: number;
  size_variant_id: number;
  color_variant_id: number;
  // sizeVariantId?: number;
  // colorVariantId?: number;
}


function orderItemToJson(orderItem: OrderItem) {
  return {
    'id': orderItem.id,
    'product_id': orderItem.product_id,
    'order_id': orderItem.order_id,
    'quantity': orderItem.quantity,
    'size_variant_id': orderItem.size_variant_id,
    'color_variant_id': orderItem.color_variant_id,
  };
}


export interface SaleData {
  id: string;
  orderItems: OrderItem[];
  customer?: Customer;
  orderTime?: string;
  totalAmount: number;
  undiscountedTotalAmount: number;
  amountPaid: number;
  paymentMode?: string;
  storeId: string;
  type: string;
  status: string;
  tableId?: string;
  occupants?: number;
  note?: string;
}

// models/sale.ts



const backendUrl = 'https://backend.openzo.in'; // Replace with your backend URL

class Sale {
  id: string;
  orderItems: OrderItem[];
  customer?: Customer;
  orderTime?: string;
  totalAmount: number;
  undiscountedTotalAmount: number;
  amountPaid: number;
  paymentMode?: string;
  storeId: string;
  type: string;
  status: string;
  tableId?: string;
  occupants?: number;
  note?: string;

  constructor(sale: Sale) {
    this.id = sale.id;
    this.orderItems = sale.orderItems;
    this.customer = sale.customer;
    this.orderTime = sale.orderTime;
    this.totalAmount = sale.totalAmount;
    this.undiscountedTotalAmount = sale.undiscountedTotalAmount;
    this.amountPaid = sale.amountPaid;
    this.paymentMode = sale.paymentMode;
    this.storeId = sale.storeId;
    this.type = sale.type;
    this.status = sale.status;
    this.tableId = sale.tableId;
    this.occupants = sale.occupants;
    this.note = sale.note;
  }

  static async createSale(sale: Sale): Promise<Sale> {
    // print(sale.);

    const response = await fetch(`${backendUrl}/sales/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: sale.id,
        order_items: sale.orderItems.map(orderItemToJson),
        customer: sale.customer,
        order_time: sale.orderTime,
        total_amount: sale.totalAmount,
        undiscounted_amount: sale.undiscountedTotalAmount,
        amount_paid: sale.amountPaid,
        payment_mode: sale.paymentMode,
        store_id: sale.storeId,
        type: sale.type,
        status: sale.status,
        table_id: sale.tableId,
        occupants: sale.occupants,
        note: sale.note,

      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create sale');
    }

    const data = await response.json();
    return Sale.fromJson(data);
  }

  static async getSaleByID(id: string): Promise<Sale> {
    const response = await fetch(`${backendUrl}/sales/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get sale');
    }

    const data = await response.json();
    return data;
  }

  static async getSalesByStoreID(storeID: string): Promise<Sale[]> {
    const response = await fetch(`${backendUrl}/sales/store/${storeID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get sales');
    }

    const data = await response.json();
    return data;
  }

  static async getSalesByUserDataID(userDataId: string): Promise<Sale[]> {
    const response = await fetch(`${backendUrl}/sales/user/${userDataId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get sales');
    }

    const data = await response.json();
    return data;
  }

  static async changeSaleStatus(id: string, status: string): Promise<Sale> {
    const response = await fetch(`${backendUrl}/sales/${id}/status/${status}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to change sale status');
    }

    const data = await response.json();
    return data;
  }

  static async updateSale(sale: Sale): Promise<Sale> {
    const response = await fetch(`${backendUrl}/sales/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: sale.id,
        order_items: sale.orderItems.map(orderItemToJson),
        customer: sale.customer,
        order_time: sale.orderTime,
        total_amount: sale.totalAmount,
        undiscounted_amount: sale.undiscountedTotalAmount,
        amount_paid: sale.amountPaid,
        payment_mode: sale.paymentMode,
        store_id: sale.storeId,
        type: sale.type,
        status: sale.status,
        table_id: sale.tableId,
        occupants: sale.occupants,
        note: sale.note,

      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update sale');
    }

    const data = await response.json();
    return Sale.fromJson(data);
  }

  static fromJson(json: any): Sale {
    return new Sale({
      id: json['id'],
      orderItems: json['order_items'],
      customer: json['customer'],
      orderTime: json['order_time'],
      totalAmount: json['total_amount'],
      undiscountedTotalAmount: json['undiscounted_amount'],
      amountPaid: json['amount_paid'],
      paymentMode: json['payment_mode'],
      storeId: json['store_id'],
      type: json['type'],
      status: json['status'],
      tableId: json['table_id'],
      occupants: json['occupants'],
      note: json['note'],

    });
  }




}


//   factory Sale.fromJson(Map < String, dynamic > json) {
//   return Sale(
//     id: json['id'],
//     orderItems: List<OrderItem>.from(
//       json['order_items'].map((x) => OrderItem.fromJson(x))),
//     customer: Customer.fromJson(json['customer']),
//     orderTime: DateTime.parse(json['order_time']),
//     totalAmount: double.parse(json['total_amount'].toString()),
//     undiscountedTotalAmount:
//     double.parse(json['undiscounted_amount'].toString()),
//     amountPaid: double.parse(json['amount_paid'].toString()),
//     paymentMode: json['payment_mode'],
//     storeId: json['store_id'],
//     type: json['type'],
//     status: json['status'],
//     tableId: json['table_id'],
//     occupants: json['occupants'],
//     note: json['note'],
//   );
// }


export default Sale;

