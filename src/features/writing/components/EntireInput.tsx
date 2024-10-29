import { SubmitHandler, useForm } from 'react-hook-form';
import ContentInput from './ContentInput';
import EmotionInput from './EmotionInput';
import styled from 'styled-components';
import { FormTypes } from '../types/formTypes';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import useWritingModeStore from '../../../stores/writingModeStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface WriteData {
  user_id: number;
  emotion_type: string;
  content: string;
}

const EntireInput = () => {
  const mutation = useMutation({
    mutationFn: async (newContent: WriteData) => {
      const response = await axios.post('/api/post/write', newContent);
      return response.data;
    },
    onSuccess: (data) => {
      setAiContent(data.ai_content);
      setIsLoadingMode(false);
      console.log('success');
    },
    onError: async () => {
      setTimeout(() => {
        setIsLoadingMode(false);
        setAiContent('고민 등록에 실패했습니다 😢');
      }, 2500);
      console.log('fail');
    },
  });
  const { register, handleSubmit, reset, setFocus } = useForm<FormTypes>();
  const { setEmotion, setContent, setAiContent } = useWritingResponseStore(
    (state) => state.actions
  );
  const {
    setIsInputMode,
    setIsUserResponseMode,
    setIsLoadingMode,
    setIsAIResponseMode,
  } = useWritingModeStore((state) => state.actions);

  const handleSubmitContent: SubmitHandler<FormTypes> = (data) => {
    if (data.emotion === null) {
      alert('⚠️ 감정을 선택해주세요!');
      return;
    }
    if (data.content.trim() === '') {
      alert('⚠️ 고민을 입력해주세요!');
    } else {
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
        user_id: 5,
        emotion_type: data.emotion,
        content: data.content,
      });
    }

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
