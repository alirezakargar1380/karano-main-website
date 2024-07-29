import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IProductDefaultDetails, IProductItem } from 'src/types/product';
import { IOrderItem } from 'src/types/order';

// ----------------------------------------------------------------------

export function useGetOrders() {
  const URL = endpoints.orders.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orders: (data as IOrderItem[]) || [],
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

export function useGetProductionOrders() {
  const URL = endpoints.orders.production_list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orders: (data as IOrderItem[]) || [],
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

export function useGetDeliveryOrders() {
  const URL = endpoints.orders.delivery_list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orders: (data as IOrderItem[]) || [],
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

export function useGetOrder(id: string) {
  const URL = endpoints.orders.one(id);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      order: (data as IOrderItem) || {},
      orderLoading: isLoading,
      //   productsError: error,
      //   productsValidating: isValidating,
      //   productsEmpty: !isLoading && !data?.products.length,
    }),
    // [data, error, isLoading, isValidating]
    [data]
  );

  return memoizedValue;
}

export function useGetTrackingOrders() {
  const URL = endpoints.orders.tracking;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orders: (data as IOrderItem[]) || [],
      ordersLoading: isLoading,
      //  productsError: error,
      //  productsValidating: isValidating,
      ordersEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
    [data]
  );

  return memoizedValue;
}

export function useGetStorageOrders() {
  const URL = endpoints.orders.storage_list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orders: (data as IOrderItem[]) || [],
      ordersLoading: isLoading,
      //  productsError: error,
      //  productsValidating: isValidating,
      ordersEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
    [data]
  );

  return memoizedValue;
}