import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, adminFetcher } from 'src/utils/axios';
import { IAdmin } from 'src/types/admin';

// ----------------------------------------------------------------------

export function useGetAdmins() {
  const URL = endpoints.admin.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, adminFetcher);

  const memoizedValue = useMemo(
    () => ({
      admins: (data as IAdmin[]) || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetAdmin(id?: number) {
  const URL = id ? endpoints.admin.one(id) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, adminFetcher);

  const memoizedValue = useMemo(
    () => ({
      admin: (data as IAdmin) || {},
      adminLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}