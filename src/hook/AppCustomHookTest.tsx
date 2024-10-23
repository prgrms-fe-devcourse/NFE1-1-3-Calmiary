import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/network/axiosInstance';
import { queryKeys } from '@/network/react-query/constants';

// axios
async function getCommunity(): Promise<any[]> {
  const { data } = await axiosInstance.get('/community');
  return data;
}

// react query
export function useCommunity(): any[] {
  const fallback: any[] = [];

  const { data = fallback } = useQuery({
    queryKey: [queryKeys.community],
    queryFn: getCommunity,
  });

  return data;
}
