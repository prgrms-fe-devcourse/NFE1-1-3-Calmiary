import { useQuery } from '@tanstack/react-query';
import { fetchUserStats } from '../api/stats';

export const useStats = (userId: string) => {
  return useQuery({
    queryKey: ['stats', userId],
    queryFn: () => fetchUserStats(userId),
    enabled: !!userId,
  });
};
