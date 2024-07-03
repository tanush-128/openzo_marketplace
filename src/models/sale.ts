// models/types.ts

import axios from "axios";

export interface Customer {
  id: number | null;
  phone: string | null;
  address: string | null;
  user_data_id: string | null;
  saleId: string | null;
}

export interface OrderItem {
  id: number | null;
  product_id: string | null; 
  order_id: string | null;
  quantity: number ;
  size_variant_id: number | null;
  color_variant_id: number | null;
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
  order_items: OrderItem[];
  customer?: Customer;
  orderTime?: string;
  total_amount: number;
  undiscounted_total_amount: number;
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
    this.order_items = sale.order_items;
    this.customer = sale.customer;
    this.orderTime = sale.orderTime;
    this.total_amount = sale.total_amount;
    this.undiscounted_total_amount = sale.undiscounted_total_amount;
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
        order_items: sale.order_items.map(orderItemToJson),
        customer: sale.customer,
        order_time: sale.orderTime,
        total_amount: sale.total_amount,
        undiscounted_amount: sale.undiscounted_total_amount,
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
      console.log(response);
      throw new Error('Failed to create sale');
    }

    const data = await response.json();
    console.log(data);
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

  

  static async getSalesByUserDataID(userDataId: string): Promise<Sale[]> {

    const token = localStorage.getItem('token');

    const response = await axios.get(`${backendUrl}/sales/user`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },

    }

    );
    if (response.status === 200) {
      return response.data.map((sale: any) => Sale.fromJson(sale));
    }
    throw new Error('Failed to get sales');

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
    return  Sale.fromJson(data);
  }

  static async updateSale(sale: Sale): Promise<Sale> {
    const response = await fetch(`${backendUrl}/sales/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: sale.id,
        order_items: sale.order_items.map(orderItemToJson),
        customer: sale.customer,
        order_time: sale.orderTime,
        total_amount: sale.total_amount,
        undiscounted_amount: sale.undiscounted_total_amount,
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
    console.log(response);
      throw new Error('Failed to update sale');
    }

    const data = await response.json();
    console.log("update sale")
    console.log(data);
    return Sale.fromJson(data);
  }

  static fromJson(json: any): Sale {
    return new Sale({
      id: json['id'],
      order_items: json['order_items'],
      customer: json['customer'],
      orderTime: json['order_time'],
      total_amount: json['total_amount'],
      undiscounted_total_amount: json['undiscounted_amount'],
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

export default Sale;

