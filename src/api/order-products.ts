import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IProductDefaultDetails, IProductItem } from 'src/types/product';
import { IOrderItem } from 'src/types/order';
import { IOrderProductItem } from 'src/types/order-products';

// ----------------------------------------------------------------------

export function useGetOrderProducts(id: number) {
  const URL = endpoints.orderProducts.one(id);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orderProducts: (data as IOrderProductItem[]) || [],
      ordersLoading: isLoading,
    //   productsError: error,
    //   productsValidating: isValidating,
    //   productsEmpty: !isLoading && !data?.products.length,
    }),
    // [data, error, isLoading, isValidating]
    [data]
  );

  return memoizedValue;
}

export function useGetReadyOrderProducts(id: string) {
  const URL = endpoints.orderProducts.ready_products_list(id);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orderProducts: (data as IOrderProductItem[]) || [],
      ordersLoading: isLoading,
    //   productsError: error,
    //   productsValidating: isValidating,
    //   productsEmpty: !isLoading && !data?.products.length,
    }),
    // [data, error, isLoading, isValidating]
    [data]
  );

  return memoizedValue;
}