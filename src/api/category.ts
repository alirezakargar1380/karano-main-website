import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IProductItem } from 'src/types/product';

export function useGetCategories() {
    // const URL = endpoints.product.list;

    // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            // products: (data?.products as IProductItem[]) || [],
            // productsLoading: isLoading,
            // productsError: error,
            categories: [
                {
                    id: 1,
                    title: "پنجره" 
                },
                {
                    id: 2,
                    title: "چوب"
                },
                {
                    id: 3,
                    title: "درب کابینتی"
                },
                {
                    id: 4,
                    title: "درب ضد سرقت"
                },
                {
                    id: 5,
                    title: "پنجره" 
                },
                {
                    id: 6,
                    title: "چوب"
                },
                {
                    id: 7,
                    title: "درب کابینتی"
                },
                {
                    id: 8,
                    title: "درب ضد سرقت"
                }
            ]
            // productsValidating: isValidating,
            // productsEmpty: !isLoading && !data?.products.length,
        }),
        []
    );

    return memoizedValue;
}