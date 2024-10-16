'use client';

import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useShowOneTime } from 'src/hooks/use-show-one-time';
import { OrderContext } from './order-context';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { useGetRejectedOrdersReport } from 'src/api/orders';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'order';

const initialState = {
    show: false,
    showPopover: false,
    text: '',
    title: '',
    color: '#1A9FD6'
};

type Props = {
    children: React.ReactNode;
};

export function OrderProvider({ children }: Props) {
    const { state, update } = useLocalStorage(STORAGE_KEY, initialState);
    const { report } = useGetRejectedOrdersReport();

    useEffect(() => {
        update('title', report.title)
        update('text', report.text)
        update('color', report.color)

        update("show", true);
        update("showPopover", false);
    }, [report.title, report])

    const onToggleShow = useCallback(() => {
        update("show", !state.show);
    }, [state.show]);

    const onHideDialog = useCallback(() => {
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
            report.title,
            onToggleShow,
            onShowPopover,
            onHideDialog,
            onHidePopover
        ]
    );

    return <OrderContext.Provider value={memoizedValue}>{children}</OrderContext.Provider>;
}