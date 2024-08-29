'use client';

import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useShowOneTime } from 'src/hooks/use-show-one-time';
import { OrderContext } from './order-context';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'checkout';
const SHOW_STORAGE_KEY = 'abc';

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

export function OrderProvider({ children }: Props) {
    const { show, toggle } = useShowOneTime(SHOW_STORAGE_KEY);

    const onToggleShow = useCallback(() => toggle(), [show])

    const memoizedValue = useMemo(
        () => ({
            show,
            onToggleShow
            //   completed,
            //   //
            //   onGetCart,
            //   onAddToCart,
            //   onDeleteCart,
            //   //
            //   onIncreaseQuantity,
            //   onDecreaseQuantity,
            //   //
            //   onCreateBilling,
            //   onApplyDiscount,
            //   onApplyShipping,
            //   //
            //   onBackStep,
            //   onNextStep,
            //   onGotoStep,
            //   //
            //   onReset,
        }),
        [
            show,
            onToggleShow
        ]
    );

    return <OrderContext.Provider value={memoizedValue}>{children}</OrderContext.Provider>;
}