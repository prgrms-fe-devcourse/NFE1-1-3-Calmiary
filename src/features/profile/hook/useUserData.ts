import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUserData = (userId: string) => {
  return useQuery({
    queryKey: ['userData', userId],
    queryFn: async () => {
      const response = await axios.get(`/api/profile/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};
