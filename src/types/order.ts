// ----------------------------------------------------------------------

import { IProductItem, IProductProperties } from "./product";
import { IUser } from "./user";

export type IOrderTableFilterValue = string | Date | null;

export type IOrderTableFilters = {
  name: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type IOrderHistory = {
  orderTime: Date;
  paymentTime: Date;
  deliveryTime: Date;
  completionTime: Date;
  timeline: {
    title: string;
    time: Date;
  }[];
};

export type IOrderShippingAddress = {
  fullAddress: string;
  phoneNumber: string;
};

export type IOrderPayment = {
  cardType: string;
  cardNumber: string;
};

export type IOrderDelivery = {
  shipBy: string;
  speedy: string;
  trackingNumber: string;
};

export type IOrderCustomer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  ipAddress: string;
};

export type IOrderProductItem = {
  id: string;
  sku: string;
  name: string;
  price: number;
  coverUrl: string;
  quantity: number;
};

export enum OrderStatus {
  pending = 'pending',
  failed = 'failed',
  accepted = 'accepted',
  edited = 'edited',
  produced = 'produced',
  production = 'production',
  ready_to_send = 'ready_to_send',
}

export enum IOrderDeliveryType {
  tehran = 'tehran',
  factory = 'factory', 
  city = 'city' 
}

export type IOrderItem = {
  id: number;
  user: IUser;
  status: OrderStatus;
  need_prepayment: boolean;
  reciver_name: string;
  reciver_phone: string;
  delivery_type: IOrderDeliveryType;
  order_products: {
    id: number
    product: IProductItem;
    properties: IProductProperties[]
  }[]
  invoice_owner: {
    first_name: string;
    last_name: string;
    id_code: string;
  }
  order_number: string;
  createdAt: Date;
};
