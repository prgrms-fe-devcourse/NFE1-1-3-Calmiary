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
          `좋은 아침이에요! 오늘 하루가 조금 걱정스러웠나 보군요. 그런 기분이 드는 건 누구에게나 있을 수 있는 일이에요. 당신은 소중한 존재이고, 이 모든 감정을 겪고 있다는 것만으로도 정말 용감한 거예요. 힘내세요!
          
          걱정을 좀 덜기 위해 오늘 하루, 짧은 시간이라도 자신을 위한 시간을 가져보는 건 어떨까요? 좋아하는 음악을 듣거나, 산책을 하면서 마음을 가라앉히는 것도 좋은 방법이에요. 자연과 함께하는 시간은 마음의 부담을 덜어줄 수 있어요!
          `
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
