import { useMutation } from '@tanstack/react-query';
import { VisibilityDataTypes } from '../types/formTypes';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import { useNavigate } from 'react-router-dom';
import showToast from '../utils/showToast';
import { axiosInstance } from '../../../network/axiosInstance';

const useMoveMutation = () => {
  // 화면 이동 로직
  const navigate = useNavigate();

  // 클라이언트 정보 불러오는 로직
  const { contentId } = useWritingResponseStore((state) => state);

  return useMutation({
    mutationFn: async (userId: VisibilityDataTypes) => {
      await axiosInstance.patch(`/diary/post/${contentId}/visibility`, userId);
    },
    onSuccess: () => {
      navigate(`/community/post/${contentId}`);
      window.scrollTo(0, 0);
    },
    onError: () => {
      showToast({
        type: 'fail',
        message: '😢 공개 설정에 실패했습니다! ',
      });
    },
  });
};

export default useMoveMutation;
