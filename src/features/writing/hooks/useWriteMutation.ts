import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { WriteDataTypes } from '../types/formTypes';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import useWritingModeStore from '../../../stores/writingModeStore';

// 베이스 URL 설정
const api = axios.create({
  baseURL: 'http://calmiary-be.org',
  headers: {
    'Content-Type': 'application/json',
  },
});

const useWriteMutation = () => {
  const { setAiContent, setContentId } = useWritingResponseStore(
    (state) => state.actions
  );

  const { setIsLoadingMode, setIsErrorMode } = useWritingModeStore(
    (state) => state.actions
  );

  return useMutation({
    mutationFn: async (newContent: WriteDataTypes) => {
      const response = await api.post('/post/write', newContent);
      return response.data;
    },
    onSuccess: (data) => {
      setAiContent(data.ai_content);
      setContentId(data.id);
      setIsLoadingMode(false);
    },
    onError: async () => {
      setTimeout(() => {
        setAiContent('고민 등록에 실패했습니다 😢');
        setContentId(0);
        setIsLoadingMode(false);
        setIsErrorMode(true);
      }, 2500);
    },
  });
};

export default useWriteMutation;
