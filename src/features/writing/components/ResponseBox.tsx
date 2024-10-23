import styled from 'styled-components';

const ResponseBox = () => {
  return (
    <Div>
      사용자의 답변 입력 부분사용자의 답변 입력 부분사용자의 답변 입력
      부분사용자의 답변 입력 부분사용자의 답변 입력 부분사용자의 답변 입력
      부분사용자의 답변 입력 부분 사용자의 답변 입력 부분사용자의 답변 입력
      부분사용자의 답변 입력 부분사용자의 답변 입력 부분사용자의 답변 입력
      부분사용자의 답변 입력 부분사용자의 답변 입력 부분사용자의 답변 입력
      부분사용자의 답변 입력 부분사용자의 답변 입력 부분사용자의 답변 입력
    </Div>
  );
};

export default ResponseBox;

const Div = styled.div`
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.write_gray100};
  width: 240px;
  border-radius: 14px;
  color: ${({ theme }) => theme.colors.write_white200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem 0 1rem 0;
`;
