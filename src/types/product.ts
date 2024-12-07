// ----------------------------------------------------------------------

import { ICategory } from "./category";
import { ICheckoutItemPropertyPrice } from "./checkout";
import { IOrderProductPropertyStatus } from "./order-products-property";

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

export type IProductImage = {
  id: number;
  main: boolean;
  name: string;
};

// ----------------------------------------------------------------------

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductDimension = {
  id?: number;
  length: number;
  width: number;
  height: number;
}

export enum CoatingType {
  jenagi = 'جناقی',
  none_jenagi = 'غیر جناقی',
  none = '',
  emty = '-'
}

export type IProductCoverType = {
  icon_image_name: string;
  id: number
  is_raw: boolean
  name: string
  createdAt: string
}

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IProductPropertyValues = {
  price: number,
  cover_type: Partial<IProductCoverType> | null,
  dimension: Partial<IProductDimension> | null
}

export interface IProductProperties extends ICheckoutItemPropertyPrice {
  id: number
  price: number,
  quantity: number,
  status?: IOrderProductPropertyStatus
  coating_type: string,
  dimension: IProductDimension
  rejection_reason: string,
  is_approved: boolean | string,
  cover_type: IProductCoverType,
  frame_type: IProductFrameType,
  profile_type: IProductProfileType
}

export type IProductProfileType = {
  id: number
  name: string
  unit_price: number
  createdAt: string
}

export type IProductFrameType = {
  id: number
  name: string
  is_glass: boolean
  need_lattice: boolean
  createdAt: string
}
export type IProductDefaultDetails = {
  id: number;
  quantity: number
  coating_type: string | boolean
  inlaid_flower: string | boolean
  type: ProductOrderType
  cover_type: IProductCoverType[]
  profile_type: IProductProfileType[]
  frame_type: IProductFrameType[]
}

export enum ProductOrderType {
  ready_to_use = 'ready_to_use',
  custom_made = 'custom_made'
}

export type IProductItem = {
  id: number;
  sku: string;
  algorithm: EAlgorithm;
  attributes: string;
  name: string;
  status: string;
  product_dimension: IProductDimension[];
  code: {
    id: number;
    code: string;
  };
  price: number;
  taxes: number;
  tags: string[];
  gender: string;
  sizes: string[];
  order_type: ProductOrderType;
  publish: string;
  property_prices: IProductPropertyValues[];
  order_form_options: IProductDefaultDetails;
  coverUrl: string;
  images: IProductImage[];
  quantity: number;
  category: ICategory;
  is_user_favorite: boolean;
  description: string;
  createdAt: Date;
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
};

export enum EAlgorithm {
  cabinet_cloumn = "cabinet_cloumn",
  cabinet_door = "cabinet_door",
  cover_sheet = "cover_sheet",
  room_door = "room_door",
  shutter_door = "shutter_door",
}