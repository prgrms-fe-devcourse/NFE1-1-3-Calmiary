import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../network/axiosInstance';

interface WithdrawError {
  message: string;
}

interface UseWithdrawMutationOptions {
  onSuccess?: () => void;
  onError?: (error: WithdrawError) => void;
}

export const useWithdrawMutation = (options?: UseWithdrawMutationOptions) => {
  return useMutation({
    mutationFn: async (userId: string) => {
      await axiosInstance.delete(`/profile/withdraw/${userId}`);
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error: WithdrawError) => {
      options?.onError?.(error);
    },
  });
};
