// ----------------------------------------------------------------------

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

export type IProductCoverType = {
  icon_image_name: string;
  id: number
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

export type IProductProperties = {
  id: number
  price: number,
  quantity: number,
  // status: 
  coating_type: string,
  dimension: string,
  product_dimension: IProductDimension
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
  createdAt: string
}
export type IProductDefaultDetails = {
  id: number;
  quantity: number
  coating_type: string | boolean
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
  attributes: string;
  name: string;
  status: string;
  product_dimension: IProductDimension[];
  code: string;
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
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IProductReview[];
  createdAt: Date;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
};
