import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IProductDefaultDetails, IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

export function useGetOrderForm(id: number) {
  const URL = endpoints.orderForm.one(id);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      form: (data as IProductDefaultDetails) || {},
      formLoading: isLoading,
      //   productsError: error,
      //   productsValidating: isValidating,
      formEmpty: !isLoading && !Object.keys(data).length,
    }),
    // [data, error, isLoading, isValidating]
    [data]
  );

  return memoizedValue;
}