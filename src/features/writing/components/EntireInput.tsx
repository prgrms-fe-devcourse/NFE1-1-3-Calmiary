import { SubmitHandler, useForm } from 'react-hook-form';
import ContentInput from './ContentInput';
import EmotionInput from './EmotionInput';
import styled from 'styled-components';
import { FormTypes } from '../types/formTypes';

const EntireInput = () => {
  const { register, handleSubmit, reset, setFocus } = useForm<FormTypes>();

  const handleSubmitContent: SubmitHandler<FormTypes> = (data) => {
    if (data.content.trim() === '') {
      alert('⚠️ 고민을 입력해주세요!');
    } else {
      console.log(data);
    }

    Promise.resolve()
      .then(() => reset())
      .then(() => setFocus('content'));
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitContent)}>
      <EmotionInput />
      <ContentInput register={register} />
    </Form>
  );
};

export default EntireInput;

const Form = styled.form`
  position: relative;
`;
