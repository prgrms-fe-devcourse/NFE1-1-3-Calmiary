import { ReactNode } from 'react';
import styled from 'styled-components';

interface QuestionBoxPropTypes {
  comment?: string;
  loadingSpinner?: ReactNode;
}

const QuestionBox = ({ comment, loadingSpinner }: QuestionBoxPropTypes) => {
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

  overflow-wrap: anywhere; // 어떤 문자든 강제로 줄바꿈
  word-break: break-all; // 모든 가능한 지점에서 줄바꿈
  white-space: normal; // 공백 처리를 기본값으로
`;
