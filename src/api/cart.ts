import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IOrderItem, IRejectedOrderReport } from 'src/types/order';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function useGetCart() {
    const { authenticated } = useAuthContext();

    const URL = authenticated ? endpoints.cart.list : null;

    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            cart: (data as any[]) || [],
            ordersLoading: isLoading,
            cartEmpty: !isLoading && !data?.length,
        }),
        [data, data?.length]
    );

    return memoizedValue;
}