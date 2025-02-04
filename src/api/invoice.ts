import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, adminFetcher } from 'src/utils/axios';

import { IOrderItem, IProductionOrderItem, IRejectedOrderReport, IStorage } from 'src/types/order';
import { Iinvoice } from 'src/sections/order-tracking/invoice-view';

export function useGetOrderInvoice(order_id: number | undefined) {
    const URL = order_id ? endpoints.invoice.calculate(order_id) : null;

    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            invoice: (data as Iinvoice) || {
                total_price: 0,
                prepayment: 0,
                shipping: 0,
                tax: 0,
                discount_percentage: 0,
                products: [],
                assemble_wage: [],
                packaging: [],
            },
            invoiceLoading: isLoading,
            //   productsError: error,
            //   productsValidating: isValidating,
            //   productsEmpty: !isLoading && !data?.products.length,
        }),
        [data, error, isLoading, isValidating]
    );

    return memoizedValue;
}