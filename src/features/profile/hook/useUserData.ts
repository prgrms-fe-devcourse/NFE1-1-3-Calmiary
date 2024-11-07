import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../network/axiosInstance';

export const useUserData = (userId: string) => {
  return useQuery({
    queryKey: ['userData', userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/profile/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};
