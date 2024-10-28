import styled from 'styled-components';
import EmotionIcon from './EmotionIcon';
import { EmotionIconTypes, FormTypes } from '../types/formTypes';
import { UseFormRegister } from 'react-hook-form';

interface EmotionInputPropTypes {
  register: UseFormRegister<FormTypes>;
}

const EmotionInput = ({ register }: EmotionInputPropTypes) => {
  const ICON_TYPE: EmotionIconTypes[] = [
    'write_emotion_soso',
    'write_emotion_cry',
    'write_emotion_smile',
    'write_emotion_scary',
    'write_emotion_angry',
  ];

  return (
    <DivWrapper>
      {ICON_TYPE.map((elem) => (
        <EmotionIcon key={elem} type={elem} register={register} />
      ))}
    </DivWrapper>
  );
};

export default EmotionInput;

const DivWrapper = styled.div`
  background: ${({ theme }) => theme.colors.write_purple200};
  border-radius: 15px;
  border: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 2rem;
  margin: 1.5rem 0 1.5rem 0;
`;
