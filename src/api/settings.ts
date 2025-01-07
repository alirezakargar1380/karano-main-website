import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IRoomDoor } from 'src/types/room-door';
import { ISettings } from 'src/types/settings';

// ----------------------------------------------------------------------

export function useGetLandingSettings() {
  const URL = endpoints.settings.landing;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      settings: (data as ISettings) || {},
    }),
    [data]
  );

  return memoizedValue;
}