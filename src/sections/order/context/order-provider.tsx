'use client';

import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useShowOneTime } from 'src/hooks/use-show-one-time';
import { OrderContext } from './order-context';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { useGetRejectedOrdersReport } from 'src/api/orders';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'order';
const SHOW_STORAGE_KEY = 'abc';

const initialState = {
    show: false,
    showPopover: false,
    rejection_text: ''
};

type Props = {
    children: React.ReactNode;
};

export function OrderProvider({ children }: Props) {
    // const { show, toggle } = useShowOneTime(SHOW_STORAGE_KEY);
    const { state, update, reset } = useLocalStorage(STORAGE_KEY, initialState);
    const { report } = useGetRejectedOrdersReport();

    useEffect(() => {
        if (report.count === 0) {
            update("show", false);
            return
        }
        update("show", true);
        update("showPopover", false);
    }, [report])

    useEffect(() => {
        if (report.order_number) {
            update('rejection_text', `سفارش شما با کد ${report.order_number}  توسط مدیر فروش ردشده است. می‌توانید از طریق منوی «پیگیری سفارش»، وضعیت سفارش‌ ردشده خود را پیگیری کنید.`)
        } else if (report.count > 0) {
            update('rejection_text', "تعدادی از سفارش‌های شما توسط مدیر فروش رد شده‌اند. می‌توانید از طریق منوی «پیگیری سفارش» وضعیت سفارش رد شده خود را پیگیری کنید.")
        }
    }, [report.order_number])

    const onToggleShow = useCallback(() => {
        // toggle()
        update("show", !state.show);
    }, [state.show]);

    const onHideDialog = useCallback(() => {
        // toggle()
        update("show", false);
    }, [state.show]);

    const onShowPopover = useCallback(() => {
        update("showPopover", true);
    }, [state.showPopover]);

    const onHidePopover = useCallback(() => {
        update("showPopover", false);
    }, [state.showPopover]);

    const memoizedValue = useMemo(
        () => ({
            ...state,
            //
            onToggleShow,
            onShowPopover,
            onHideDialog,
            onHidePopover
            //
        }),
        [
            state,
            report.order_number,
            onToggleShow,
            onShowPopover,
            onHideDialog,
            onHidePopover
        ]
    );

    return <OrderContext.Provider value={memoizedValue}>{children}</OrderContext.Provider>;
}