import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';
import { IAdmin } from 'src/types/admin';
import { IdeaImages } from 'src/types/idea';

// ----------------------------------------------------------------------

export function useGetLandingIdeaImages() {
  const URL = endpoints.landing.idea_images.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      idea: (data as IdeaImages[]) || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
