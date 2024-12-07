import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IProductItem } from 'src/types/product';
import { ICategory } from 'src/types/category';
import { isNumber } from 'lodash';

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
    const URL = (id && !isNaN(Number(id))) ? endpoints.category.products(id) : null

    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            isLoading,
            // productsError: error,
            favProductIds: (data?.favProductIds as number[]) || [],
            products: (data?.data as IProductItem[]) || []
            // productsValidating: isValidating,
            // productsEmpty: !isLoading && !data?.products.length,
        }),
        [data?.data, data?.favProductIds]
    );

    return memoizedValue;
}