import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

const ContentInput = () => {
  return (
    <Form>
      <Input />
      <SubmitButton>
        <Icon type="write_submit" size={22} />
      </SubmitButton>
    </Form>
  );
};

export default ContentInput;

const Form = styled.form`
  position: relative;
`;

const Input = styled.textarea`
  background: ${({ theme }) => theme.colors.write_purple200};
  color: ${({ theme }) => theme.colors.write_white200};
  border-radius: 15px;
  border: none;
  outline: none;
  width: 100%;
  height: 150px;
  padding: 1rem 4rem 1rem 1rem;
  resize: none;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.write_gray200};
  border-radius: 50%;
  border: none;
  width: 42px;
  height: 42px;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;
