import { ReactNode } from 'react';
import styled from 'styled-components';
import useWritingModeStore from '../../../stores/writingModeStore';

interface QuestionBoxPropTypes {
  comment?: string;
  loadingSpinner?: ReactNode;
}

const QuestionBox = ({ comment, loadingSpinner }: QuestionBoxPropTypes) => {
  const { isLoadingMode } = useWritingModeStore((state) => state);
  return (
    <Div>
      {isLoadingMode && <div>{loadingSpinner}</div>}
      <div>{comment}</div>
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
  margin: 1.5rem 0;
  line-height: 1.2rem;

  overflow-wrap: break-word; // 어떤 문자든 강제로 줄바꿈
  word-break: break-all; // 모든 가능한 지점에서 줄바꿈
  white-space: pre-line; // 공백 처리를 기본값으로
`;
