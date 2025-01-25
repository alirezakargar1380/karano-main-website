import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, adminFetcher } from 'src/utils/axios';

import { IOrderItem, IRejectedOrderReport } from 'src/types/order';
import { useAuthContext } from 'src/auth/hooks';

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

export function useGetSalesOrders() {
  const URL = endpoints.orders.sales;

  const { data, isLoading, error, isValidating } = useSWR(URL, adminFetcher);

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
    [data]
  );

  return memoizedValue;
}

export function useGetOrder(id: string) {
  const URL = id ? endpoints.orders.one(id) : null

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const refreshOrder = () => {
    mutate(URL);
  };

  const memoizedValue = useMemo(
    () => ({
      order: (data as IOrderItem) || {},
      orderLoading: isLoading,
      orderEmpty: !isLoading && !data,
      refreshOrder
      //   productsError: error,
      //   productsValidating: isValidating,
      //   productsEmpty: !isLoading && !data?.products.length,
    }),
    [id, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetTrackingOrders() {
  const URL = endpoints.orders.tracking;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const refreshOrders = () => {
    mutate(URL);
  };

  const memoizedValue = useMemo(
    () => ({
      orders: (data as IOrderItem[]) || [],
      ordersLoading: isLoading,
      ordersEmpty: !isLoading && !data?.length,
      refreshOrders
    }),
    [data, error, isLoading, isValidating]
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
  );

  return memoizedValue;
}

export function useGetRejectedOrdersReport() {
  const { authenticated } = useAuthContext();

  const URL = authenticated ? endpoints.orders.report.rejected : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      report: (data as IRejectedOrderReport) || {},
      // ordersLoading: isLoading,
      //  productsError: error,
      //  productsValidating: isValidating,
      // ordersEmpty: !isLoading && !data.length,
    }),
    [data?.order_number, error, isLoading, isValidating]
  );

  return memoizedValue;
}