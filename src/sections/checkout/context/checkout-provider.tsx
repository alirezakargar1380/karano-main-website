'use client';

import uniq from 'lodash/uniq';
import { useMemo, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { getStorage, setStorage, useLocalStorage } from 'src/hooks/use-local-storage';

import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';

import { IAddressItem } from 'src/types/address';
import { ICheckoutItem, ICheckoutNewItem } from 'src/types/checkout';

import { CheckoutContext } from './checkout-context';
import _ from 'lodash';

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

  const onGetCart = useCallback(() => {
    // const quality: number = state.items.map((item: ICheckoutItem) => item.properties.reduce((acc, curr) => acc + curr.quantity, 0))[0];
    // const getTotalQuantity = (item: ICheckoutItem) => {
    //   return item.properties.reduce((total, propertyPrice) => propertyPrice.quantity, 0);
    // };
    // const quality: number = state.items.reduce((total: number, item: ICheckoutItem) => total + getTotalQuantity(item), 0);
    // const quality: number = state.items.reduce((total: number, item: ICheckoutItem) => total + getTotalQuantity(item), 0);

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
  ]);

  useEffect(() => {
    console.log('...')
    // setCheckoutState(state);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const newState = JSON.parse(event.newValue || '{}');
        console.log(newState)
        if (newState.items?.length !== state.items?.length)
          update('items', newState.items || []);
        // setCheckoutState(newState);
      }
    };

    console.log('i start event listenter')
    window.addEventListener('storage', handleStorageChange);

    return () => {
      console.log('i stop event listenter')
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   console.log('...')
  //   const restored = getStorage(STORAGE_KEY);

  //   if (restored) {
  //     onGetCart();
  //   }
  // }, [onGetCart]);

  const onAddToCart = useCallback(
    (newItem: Partial<ICheckoutNewItem>, concatWithProperty: boolean = true) => {

      const updatedItems: ICheckoutItem[] | any = state.items.map((item: ICheckoutItem) => {
        if (item.id === newItem.id) {
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
              // properties: (newItem?.properties?.length) ? 
              // item.properties.concat(newItem.properties) : item.properties,
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
    },
    [update, state.items]
  );

  const onDeleteCart = useCallback(
    (itemId: string) => {
      const updatedItems = state.items.filter((item: ICheckoutItem) => item.id !== itemId);

      update('items', updatedItems);
    },
    [update, state.items]
  );

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
    // if (completed) {
    reset();
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
