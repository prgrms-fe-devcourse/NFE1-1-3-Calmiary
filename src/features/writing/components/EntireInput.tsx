import styled from 'styled-components';
import ContentInput from './ContentInput';
import EmotionInput from './EmotionInput';
import useWriteForm from '../hooks/useWriteForm';

const EntireInput = () => {
  const { register, handleSubmit, handleSubmitContent } = useWriteForm();
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
