import { endpoints, fetcher } from "src/utils/axios";
import useSWR from 'swr';
import { useMemo } from 'react';
import { IAddressItem } from "src/types/address";

export function useGetAddresses() {
    const URL = endpoints.addresses.list;
  
    const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  
    const memoizedValue = useMemo(
      () => ({
        // products: (data?.products as IProductItem[]) || [],
        addresses: (data as IAddressItem[]) || [],
        addressesLoading: isLoading,
        addressesEmpty: !isLoading && !data.length,
      }),
      [data?.products, error, isLoading, isValidating]
    );
  
    return memoizedValue;
  }