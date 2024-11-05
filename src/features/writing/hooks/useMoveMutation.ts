import { useMutation } from '@tanstack/react-query';
import { VisibilityDataTypes } from '../types/formTypes';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import showToast from '../utils/showToast';

const useMoveMutation = () => {
  // 화면 이동 로직
  const navigate = useNavigate();

  // 클라이언트 정보 불러오는 로직
  const { contentId } = useWritingResponseStore((state) => state);

  return useMutation({
    mutationFn: async (userId: VisibilityDataTypes) => {
      await axios.patch(`/api/diary/post/${contentId}/visibility`, userId);
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
