import { endpoints, fetcher } from "src/utils/axios";
import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { IAddressItem } from "src/types/address";

export function useGetAddresses() {
  const URL = endpoints.addresses.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const refresh = () => {
    mutate(URL);
  };

  const memoizedValue = useMemo(
    () => ({
      addresses: (data as IAddressItem[]) || [],
      addressesLoading: isLoading,
      addressesEmpty: !isLoading && !data.length,
      refresh
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetAddress(id?: any) {
  const URL = id ? endpoints.addresses.one(id) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const refresh = () => {
    mutate(URL);
  };

  const memoizedValue = useMemo(
    () => ({
      address: (data as IAddressItem) || [],
      addressLoading: isLoading,
      addressEmpty: !isLoading && (!data || Object.keys(data).length === 0),
      refresh
    }),
    [data, error, isLoading, isValidating, id]
  );

  return memoizedValue;
}