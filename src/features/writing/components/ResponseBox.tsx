import styled from 'styled-components';

const ResponseBox = () => {
  return <Div>사용자의 답변</Div>;
};

export default ResponseBox;

const Div = styled.div`
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.write_gray100};
  width: 15rem;
  border-radius: 14px;
  color: ${({ theme }) => theme.colors.write_white200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1.5rem 0 1.5rem 0;
`;
