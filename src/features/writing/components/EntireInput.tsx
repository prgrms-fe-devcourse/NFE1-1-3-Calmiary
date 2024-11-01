import { SubmitHandler, useForm } from 'react-hook-form';
import ContentInput from './ContentInput';
import EmotionInput from './EmotionInput';
import styled from 'styled-components';
import { FormTypes, WriteDataTypes } from '../types/formTypes';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import useWritingModeStore from '../../../stores/writingModeStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useUser } from '../../home/hooks/useUser';
import showToast from '../utils/showToast';

const EntireInput = () => {
  const { getUserId } = useUser();
  const userId = getUserId().user_id;

  const mutation = useMutation({
    mutationFn: async (newContent: WriteDataTypes) => {
      const response = await axios.post('/api/post/write', newContent);
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
  const { register, handleSubmit, reset, setFocus } = useForm<FormTypes>();

  const { setEmotion, setContent, setAiContent, setContentId } =
    useWritingResponseStore((state) => state.actions);
  const {
    setIsInputMode,
    setIsUserResponseMode,
    setIsLoadingMode,
    setIsAIResponseMode,
    setIsErrorMode,
  } = useWritingModeStore((state) => state.actions);

  const handleSubmitContent: SubmitHandler<FormTypes> = (data) => {
    if (data.emotion === null) {
      showToast({
        type: 'fail',
        message: '😮 감정을 선택해주세요!',
      });
      return;
    }
    if (data.content.trim() === '') {
      showToast({
        type: 'fail',
        message: '✏️ 고민을 입력해주세요!',
      });
      return;
    }

    setEmotion(data.emotion);
    setContent(data.content);
    setIsInputMode(false);
    setTimeout(() => {
      setIsUserResponseMode(true);
    }, 1000);
    setTimeout(() => {
      setIsLoadingMode(true);
      setIsAIResponseMode(true);
    }, 2000);
    mutation.mutate({
      user_id: userId,
      emotion_type: data.emotion,
      content: data.content,
    });

    Promise.resolve()
      .then(() => reset())
      .then(() => setFocus('content'));
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitContent)}>
      <EmotionInput register={register} />
      <ContentInput register={register} />
    </Form>
  );
};

export default EntireInput;

const Form = styled.form`
  position: relative;
  max-width: 390px;
`;
