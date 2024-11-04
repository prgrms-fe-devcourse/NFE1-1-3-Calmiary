import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
      await axios.delete(`/api/profile/withdraw/${userId}`);
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error: WithdrawError) => {
      options?.onError?.(error);
    },
  });
};
