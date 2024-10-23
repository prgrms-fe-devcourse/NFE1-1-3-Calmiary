import styled from 'styled-components';

const QuestionBox = () => {
  return <Div>오늘 어떤 고민이 있나요?</Div>;
};

export default QuestionBox;

const Div = styled.div`
  background: ${({ theme }) => theme.colors.write_purple300};
  width: 15rem;
  color: ${({ theme }) => theme.colors.write_white200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 14px;
  margin: 1rem 0 1rem 0;
`;
