import { IAddressItem } from './address';
import { IOrderProductPropertyStatus } from './order-products-property';
import { IProductCoverType, IProductFrameType, IProductProfileType, IProductDimension, ProductOrderType } from './product';

// ----------------------------------------------------------------------

export type ICheckoutItem = {
  id: number | any;
  name: string;
  coverUrl: string;
  price: number;
  order_type: ProductOrderType;
  properties: ICheckoutItemPropertyPrice[]
  subTotal: number;
  order_form_id: number;
  need_to_assemble: boolean
};

export type ICheckoutAddCustomMadeProductData = {
  quantity: number;
  dimention: {
    width: number;
    height: number;
  };
  coating_type: string;
  // cover_type: IProductCoverType;
  // profile_type: IProductProfileType,
  // frame_type: IProductFrameType,
  cover_type: string;
  profile_type: string,
  frame_type: string,
};

export interface ICheckoutNewItem extends Omit<ICheckoutItem, 'properties'> {
  properties: ICheckoutItemPropertyPrice[]
}

export interface ICheckoutItemPropertyPrice {
  id?: number
  status?: IOrderProductPropertyStatus
  quantity: number;
  dimension: IProductDimension;
  coating_type: string;
  cover_type: IProductCoverType;
  profile_type: IProductProfileType,
  frame_type: IProductFrameType,
}

export type ICheckoutDeliveryOption = {
  value: number;
  label: string;
  description: string;
};

export type ICheckoutPaymentOption = {
  value: string;
  label: string;
  description: string;
};

export type ICheckoutCardOption = {
  value: string;
  label: string;
};

export type ICheckoutValue = {
  total: number;
  subTotal: number;
  discount: number;
  shipping: number;
  activeStep: number;
  totalItems: number;
  items: ICheckoutItem[];
  billing: IAddressItem | null;
};

// export type CheckoutContextProps = ICheckoutValue & {
export type CheckoutContextProps = {
  completed: boolean;
  //
  onGetCart: () => void;
  onAddToCart: (newItem: Partial<ICheckoutNewItem>, concatWithProperty: boolean) => void;
  onDeleteCart: (index: number, itemIndex: number, propertyIndex: number) => void;
  //
  onIncreaseQuantity: (itemId: string) => void;
  onDecreaseQuantity: (itemId: string) => void;
  //
  onBackStep: VoidFunction;
  onNextStep: VoidFunction;
  onGotoStep: (step: number) => void;
  //
  onCreateBilling: (billing: IAddressItem) => void;
  onApplyDiscount: (discount: number) => void;
  onApplyShipping: (discount: number) => void;
  //
  canReset: boolean;
  onReset: VoidFunction;
};
