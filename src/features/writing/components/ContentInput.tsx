import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { UseFormRegister } from 'react-hook-form';
import { FormTypes } from '../types/formTypes';

interface ContentInputPropTypes {
  register: UseFormRegister<FormTypes>;
}

const ContentInput = ({ register }: ContentInputPropTypes) => {
  return (
    <ContentInputWrapper>
      <InputWrapper>
        <Input {...register('content')} maxLength={500} />
      </InputWrapper>
      <ButtonWrapper type="submit">
        <Icon type="write_submit" size={22} />
      </ButtonWrapper>
    </ContentInputWrapper>
  );
};

export default ContentInput;

const ContentInputWrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  background: ${({ theme }) => theme.colors.write_purple200};
  position: relative;
  height: 150px;
  padding: 1rem 0;
  border-radius: 15px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Input = styled.textarea`
  background: transparent;
  color: ${({ theme }) => theme.colors.write_white200};
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 0 4rem 0 1rem;
  resize: none;
  overflow: visible;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonWrapper = styled.button`
  background: ${({ theme }) => theme.colors.write_gray200};
  border-radius: 50%;
  border: none;
  width: 42px;
  height: 42px;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;
