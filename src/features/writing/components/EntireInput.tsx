import { SubmitHandler, useForm } from 'react-hook-form';
import ContentInput from './ContentInput';
import EmotionInput from './EmotionInput';
import styled from 'styled-components';
import { FormTypes } from '../types/formTypes';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import useWritingModeStore from '../../../stores/writingModeStore';

const EntireInput = () => {
  const { register, handleSubmit, reset, setFocus } = useForm<FormTypes>();
  const { setEmotion, setContent } = useWritingResponseStore(
    (state) => state.actions
  );
  const { setIsInputMode, setIsUserResponseMode, setIsAIResponseMode } =
    useWritingModeStore((state) => state.actions);

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
        setIsAIResponseMode(true);
      }, 2500);
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
