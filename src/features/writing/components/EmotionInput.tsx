import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

const EmotionInput = () => {
  return (
    <Div>
      <Icon type="write_emotion_soso" size={54} />
      <Icon type="write_emotion_cry" size={54} />
      <Icon type="write_emotion_smile" size={54} />
      <Icon type="write_emotion_scary" size={54} />
      <Icon type="write_emotion_angry" size={54} />
    </Div>
  );
};

export default EmotionInput;

const Div = styled.div`
  background: ${({ theme }) => theme.colors.write_purple200};
  border-radius: 15px;
  border: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  margin: 0 0 1rem 0;
`;
