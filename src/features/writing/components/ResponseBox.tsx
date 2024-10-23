import styled from 'styled-components';

const ResponseBox = () => {
  return <Div>사용자의 답변 입력 부분</Div>;
};

export default ResponseBox;

const Div = styled.div`
  background: ${({ theme }) => theme.colors.write_purple300};
  width: 240px;
  color: ${({ theme }) => theme.colors.write_white200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 14px;
  margin: 1rem 0 1rem 0;
`;
