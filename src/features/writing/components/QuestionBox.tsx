import { ReactNode } from 'react';
import styled from 'styled-components';

interface QuestionBoxProp {
  comment?: string;
  loadingSpinner?: ReactNode;
}
const QuestionBox = ({ comment, loadingSpinner }: QuestionBoxProp) => {
  return (
    <Div>
      <div>{comment}</div>
      <div>{loadingSpinner}</div>
    </Div>
  );
};

export default QuestionBox;

const Div = styled.div`
  background: ${({ theme }) => theme.colors.write_purple300};
  max-width: 15rem;
  width: auto;
  color: ${({ theme }) => theme.colors.write_white200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 14px;
  margin: 1.5rem 0 1.5rem 0;
`;
