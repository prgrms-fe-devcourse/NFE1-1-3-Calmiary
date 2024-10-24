import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { EmotionIconTypes, FormTypes } from '../types/formTypes';
import { UseFormRegister } from 'react-hook-form';

interface EmotionIconPropTypes {
  type: EmotionIconTypes;
  register: UseFormRegister<FormTypes>;
}

const EmotionIcon = ({ type, register }: EmotionIconPropTypes) => {
  return (
    <IconWrapper>
      <input
        type="radio"
        value={type.split('_')[2]}
        {...register('emotion')}
        hidden
      />
      <IconLayout>
        <Icon type={type} size={54} />
      </IconLayout>
    </IconWrapper>
  );
};

export default EmotionIcon;

const IconWrapper = styled.label`
  cursor: pointer;
`;

const IconLayout = styled.div`
  transition: all 0.4s ease;

  ${IconWrapper}:hover & {
    transform: translateY(-6px);
  }

  input[type='radio']:checked + & {
    transform: translateY(-12px);
  }
`;
