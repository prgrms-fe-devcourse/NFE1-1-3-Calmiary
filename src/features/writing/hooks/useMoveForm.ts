import { useUser } from '../../home/hooks/useUser';
import showToast from '../utils/showToast';
import useMoveMutation from './useMoveMutation';

const useMoveForm = () => {
  // 사용자 정보 불러오는 로직
  const { getUserId } = useUser();
  const userId = getUserId().user_id;

  // 서버로 정보 전송 로직
  const mutation = useMoveMutation();

  // 클라이언트 정보 관리하는 로직
  const handleConfirm = () => {
    mutation.mutate({
      user_id: userId,
    });
    showToast({
      type: 'success',
      message: '🙌 고민에 대한 조언을 받아보세요!',
    });
  };

  return handleConfirm;
};

export default useMoveForm;
