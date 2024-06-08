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

export type ProductDimension = {
  id?: number;
  // unit: string;
  length: string;
  width: string;
  height: string;
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
  cover_type: Partial<IProductCoverType>,
  dimension: Partial<ProductDimension>
}

export enum ProductOrderType {
  ready_to_use = 'ready_to_use',
  custom_made = 'custom_made'
}
export type IProductProfileType = {
  id: number
  name: string
  createdAt: string
}
export type IProductFrameType = {
  id: number
  name: string
  createdAt: string
}
export type IProductDefaultDetails = {
  quantity: number,
  coating_type: string | boolean,
  type: ProductOrderType,
  cover_type: IProductCoverType[],
  profile_type: IProductProfileType[]
  frame_type: IProductFrameType[]
}

export type IProductItem = {
  id: string;
  sku: string;
  name: string;
  product_dimension: ProductDimension[];
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  gender: string;
  sizes: string[];
  publish: string;
  property_prices: IProductPropertyValues[];
  order_form_options?: IProductDefaultDetails;
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
