import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IProductItem } from 'src/types/product';
import { ICategory } from 'src/types/category';

export function useGetFavoriteProducts() {
    const URL = endpoints.favorite.list;

    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            categoryLoading: isLoading,
            // productsError: error,
            favorites: (data as any[]) || [],
            // productsValidating: isValidating,
            isEmpty: !isLoading && !data?.length,
        }),
        [data]
    );

    return memoizedValue;
}