// ----------------------------------------------------------------------

import { IAddressItem } from "./address";
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
  posted = 'posted',
  preparing = 'preparing',
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

export type IRejectedOrderReport = {
  // count: number;
  // order_number: string;
  title: string;
  text: string;
  color: string;
  notification_id: string;
  seen: boolean;
}

export type IOrderItem = {
  id: number;
  user: IUser;
  status: OrderStatus;
  need_prepayment: boolean;
  prepayment: number;
  production_days: number;
  reciver_name: string;
  reciver_phone: string;
  provice: string;
  city: string;
  address: IAddressItem;
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
  production_date: string;
  createdAt: string;
};


export type OrderContextProps = {
  show: boolean;
  showPopover: boolean;
  text: string;
  title: string;
  color: string;
  notification_id: string;
  onToggleShow: VoidFunction;
  onShowPopover: VoidFunction;
  onHideDialog: VoidFunction;
  onHidePopover: VoidFunction;
};