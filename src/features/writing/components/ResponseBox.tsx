import styled from 'styled-components';
import useWritingStore from '../../../stores/writingResponseStore';

const ResponseBox = () => {
  const emotion = useWritingStore((state) => state.emotion);
  const content = useWritingStore((state) => state.content);
  return (
    <Div>
      {emotion}, {content}
    </Div>
  );
};

export default ResponseBox;

const Div = styled.div`
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.write_gray100};
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
