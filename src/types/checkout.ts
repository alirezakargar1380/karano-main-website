import { IAddressItem } from './address';
import { IProductCoverType, ProductDimension } from './product';

// ----------------------------------------------------------------------

export type ICheckoutItem = {
  id: number | any;
  name: string;
  coverUrl: string;
  price: number;
  property_prices: ICheckoutItemPropertyPrice[]
  subTotal: number;
};

export type ICheckoutAddCustomMadeProductData = {
  quantity: number;
  dimention: string;
  cover_type: string;
};

export interface ICheckoutNewItem extends Omit<ICheckoutItem, 'property_prices'> {
  property_prices: ICheckoutItemPropertyPrice
}

export interface ICheckoutItemPropertyPrice {
  quantity: number;
  dimention: string;
  cover_type: IProductCoverType;
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

export type CheckoutContextProps = ICheckoutValue & {
  completed: boolean;
  //
  onAddToCart: (newItem: Omit<ICheckoutItem, 'subTotal'>) => void;
  onDeleteCart: (itemId: string) => void;
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
