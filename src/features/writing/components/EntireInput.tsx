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
        setAiContent(
          '걱정하고 계신 상황이 얼마나 힘든지 이해해요. 이렇게 마음속에 떠오르는 생각들은 정말 괴롭고 피곤하게 만들 수 있어요. 하지만 당신의 마음이 편안해지길 바라며, 힘내시길 바랍니다.혹시 그 걱정이 구체적으로 어떤 내용인지 이야기해보는 건 어떨까요? 친구나 가족과 대화를 나눠 보거나, 간단한 일기 쓰기를 시도해 보는 것도 좋습니다. 그렇게 하면 마음이 좀 더 가벼워질 수 있을 거예요.'
        );
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
