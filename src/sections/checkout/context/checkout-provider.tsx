'use client';

import { useMemo, useEffect, useCallback } from 'react';

import { useRouter } from 'src/routes/hooks';

import { getStorage, useLocalStorage } from 'src/hooks/use-local-storage';

import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';

import { IAddressItem } from 'src/types/address';
import { ICheckoutItem, ICheckoutNewItem } from 'src/types/checkout';

import { CheckoutContext } from './checkout-context';
import _ from 'lodash';
import { useChannel } from 'src/hooks/use-chennel';
import { useGetCart } from 'src/api/cart';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'checkout';

const initialState = {
  activeStep: 0,
  items: [],
  subTotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
};

type Props = {
  children: React.ReactNode;
};

export function CheckoutProvider({ children }: Props) {
  const router = useRouter();

  const { state, update, reset } = useLocalStorage(STORAGE_KEY, initialState);
  const { channel } = useChannel(STORAGE_KEY);
  const { cart } = useGetCart();

  useEffect(() => {
    channel.addEventListener('message', function (event) {
      if (event.data.key === STORAGE_KEY) {
        update('items', event.data.value)
      }
    })
  }, []);

  useEffect(() => {
    update('items', cart)
    update('totalItems', cart.length)
    console.log(cart)
  }, [cart])

  const onGetCart = useCallback(() => {

    let quality: number = 0

    state.items.map((product: ICheckoutItem) => {
      quality += _.sumBy(product.properties, 'quantity');
    })

    const totalItems: number = quality;

    const subTotal: number = state.items.reduce(
      (total: number, item: ICheckoutItem) => (total + quality) * item.price,
      0
    );

    update('subTotal', subTotal);
    update('totalItems', totalItems);
    update('billing', state.activeStep === 1 ? null : state.billing);
    update('discount', state.items.length ? state.discount : 0);
    update('shipping', state.items.length ? state.shipping : 0);
    update('total', state.subTotal - state.discount + state.shipping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.items,
    state.activeStep,
    state.billing,
    state.discount,
    state.shipping,
    state.subTotal,
    update,
  ]);

  const onAddToCart = useCallback(
    (newItem: Partial<ICheckoutNewItem>, concatWithProperty: boolean = true) => {

      const updatedItems: ICheckoutItem[] | any = state.items.map((item: ICheckoutItem) => {
        if (item.id == newItem.id) {
          if (concatWithProperty) {
            return {
              ...item,
              ...newItem,
              properties: (newItem?.properties?.length) ?
                item.properties.concat(newItem.properties) : item.properties,
            };
          } else {
            return {
              ...item,
              ...newItem,
              properties: newItem.properties,
            };
          }

        }
        return item;
      });

      // if item was emty, push new item
      if (!updatedItems.some((item: ICheckoutItem) => item.id === newItem.id)) {
        updatedItems.push({
          ...newItem,
          properties: newItem.properties,
        });
      }

      update('items', updatedItems);
      channel.postMessage({ key: STORAGE_KEY, value: updatedItems })
    },
    [update, state.items, channel]
  );

  const onDeleteCart = // useCallback(
    (itemId: number, propertyIndex: number) => {
      const restored = getStorage(STORAGE_KEY);
      if (!restored?.items?.length) return

      let item = restored.items.find((item: ICheckoutItem) => item.id === itemId);
      let productIndex = restored.items.findIndex((item: ICheckoutItem) => item.id === itemId);

      console.log('-> productIndex', productIndex)
      console.log(item)
      const index = propertyIndex;
      if (index > -1)
        item.properties.splice(index, 1)

      if (!item.properties.length) {
        restored.items = restored.items.filter((item: ICheckoutItem) => item.id !== itemId);
      } else {
        restored.items[productIndex] = item
      }

      update('items', restored.items);
      channel.postMessage({ key: STORAGE_KEY, value: restored.items })
    }//,
  // [update, channel, state.items]
  // );

  const onBackStep = useCallback(() => {
    update('activeStep', state.activeStep - 1);
  }, [update, state.activeStep]);

  const onNextStep = useCallback(() => {
    update('activeStep', state.activeStep + 1);
  }, [update, state.activeStep]);

  const onGotoStep = useCallback(
    (step: number) => {
      update('activeStep', step);
    },
    [update]
  );

  const onIncreaseQuantity = useCallback(
    (itemId: string) => {
      const updatedItems = state.items.map((item: ICheckoutItem) => {
        if (item.id === itemId) {
          return {
            ...item,
            // quantity: item.quantity + 1,
          };
        }
        return item;
      });

      update('items', updatedItems);
    },
    [update, state.items]
  );

  const onDecreaseQuantity = useCallback(
    (itemId: string) => {
      const updatedItems = state.items.map((item: ICheckoutItem) => {
        if (item.id === itemId) {
          return {
            ...item,
            // quantity: item.quantity - 1,
          };
        }
        return item;
      });

      update('items', updatedItems);
    },
    [update, state.items]
  );

  const onCreateBilling = useCallback(
    (address: IAddressItem) => {
      update('billing', address);

      onNextStep();
    },
    [onNextStep, update]
  );

  const onApplyDiscount = useCallback(
    (discount: number) => {
      update('discount', discount);
    },
    [update]
  );

  const onApplyShipping = useCallback(
    (shipping: number) => {
      update('shipping', shipping);
    },
    [update]
  );

  const completed = state.activeStep === PRODUCT_CHECKOUT_STEPS.length;

  // Reset
  const onReset = useCallback(() => {
    console.log('im resetting...')
    // if (completed) {
    reset();
    channel.postMessage({ key: STORAGE_KEY, value: [] })
    // router.replace(paths.product.root);
    // }
  }, [completed, reset, router]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      completed,
      //
      onGetCart,
      onAddToCart,
      onDeleteCart,
      //
      onIncreaseQuantity,
      onDecreaseQuantity,
      //
      onCreateBilling,
      onApplyDiscount,
      onApplyShipping,
      //
      onBackStep,
      onNextStep,
      onGotoStep,
      //
      onReset,
    }),
    [
      completed,
      onGetCart,
      onAddToCart,
      onApplyDiscount,
      onApplyShipping,
      onBackStep,
      onCreateBilling,
      onDecreaseQuantity,
      onDeleteCart,
      onGotoStep,
      onIncreaseQuantity,
      onNextStep,
      onReset,
      state,
    ]
  );

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}
