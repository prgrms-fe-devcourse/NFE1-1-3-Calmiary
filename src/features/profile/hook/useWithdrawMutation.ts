import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../home/hooks/useUser';

interface WithdrawError {
  message: string;
}

export const useWithdrawMutation = () => {
  const { getUserId } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { user_id } = getUserId();
      await axios.delete(`/api/profile/withdraw/${user_id}`);
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error: WithdrawError) => {
      alert(`오류 발생: ${error.message}`); //toast로 바꾸기
    },
  });
};
