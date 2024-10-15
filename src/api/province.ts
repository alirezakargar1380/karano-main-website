
import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetProvinces() {
  const URL = endpoints.provinces.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      provinces: (data as any[]) || [],
      provincesLoading: isLoading,
      provincesError: error,
      provincesValidating: isValidating,
      provincesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetProvinceCities(provinceId?: number) {
  const URL = provinceId ? endpoints.provinces.cities(provinceId) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      cities: (data as any[]) || [],
      citiesLoading: isLoading,
      citiesError: error,
      citiesValidating: isValidating,
      citiesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}