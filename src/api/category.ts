import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IProductItem } from 'src/types/product';
import { ICategory } from 'src/types/category';

export function useGetCategories() {
    const URL = endpoints.category.list;

    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            categoryLoading: isLoading,
            // productsError: error,
            categories: (data as ICategory[]) || [],
            // productsValidating: isValidating,
            // productsEmpty: !isLoading && !data?.products.length,
        }),
        [data]
    );

    return memoizedValue;
}

export function useGetCategoryProducts(id: any) {
    const URL = endpoints.category.products(id);

    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            categoryLoading: isLoading,
            // productsError: error,
            products: (data as IProductItem[]) || [],
            // productsValidating: isValidating,
            // productsEmpty: !isLoading && !data?.products.length,
        }),
        [data]
    );

    return memoizedValue;
}