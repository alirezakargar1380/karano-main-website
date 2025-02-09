// ----------------------------------------------------------------------

import { IAddressItem } from "./address";
import { ECoatingTexture } from "./cart";
import { CoatingType, EBackToBackDimension, IProductItem, IProductProperties } from "./product";
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
  removed = 'removed',
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

export interface IStorage {
  name: string;
  code: string;
  need_to_assemble: boolean;
  order_type: string;
  quantity: number;
  dimension?: {
    length: number;
    width: number;
  }
}

export type IOrderItem = {
  id: number;
  user: IUser;
  status: OrderStatus;
  need_prepayment: boolean;
  discount_percentage: number;
  prepayment: number;
  total: number;
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

interface IShutterDoor {
  name: string;
  code: string;
  cover: string;
  need_to_assemble: boolean
  quantity: number;
  dimension: {
    length: number,
    width: number,
  }
}

export interface IFrame {
  name: string,
  code: string,
  need_to_assemble: boolean
  coating_type: CoatingType | string,
  coating_texture: ECoatingTexture | string,
  back_to_back_dimension: EBackToBackDimension | string,
  cover: string;
  frame: string;
  quantity: number,
  frame_dimension: {
    length: number,
    width: number,
  },
  dimension: {
    length: number,
    width: number,
  }
}

export interface ICoverSheet {
  name: string,
  code: string,
  cover_edge_tape: string,
  cover: string,
  // need_to_assemble: boolean
  coating_texture: ECoatingTexture | string,
  quantity: number,
  dimension: {
    length: number,
    width: number,
  }
}

export interface ICabinetCloumn {
  name: string;
  code: string;
  cover: string;
  inlaid_flower: boolean;
  inlaid_flower_emty_space: number;
  quantity: number,
  dimension: {
    length: number,
    width: number,
  }
}

export interface IDoors {
  name: string;
  code: string;
  cover: string;
  coating_texture?: ECoatingTexture | string,
  back_to_back_dimension?: string,
  frame_width?: string,
  increaser?: string,
  coating_type?: string,
  quantity: number,
  dimension: {
    length: number,
    width: number,
  }
}

export type IProductionOrderProducts = {
  frames: IFrame[]
  shutter_door: IShutterDoor[]
  cover_sheets: ICoverSheet[]
  cabinet_cloumns: ICabinetCloumn[]
  doors: IDoors[]
  room_doors: IDoors[]
}

export type IProductionOrderItem = {
  id: number;
  user: IUser;
  status: OrderStatus;
  order_number: string;
  production_date: string;
  products: IProductionOrderProducts
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