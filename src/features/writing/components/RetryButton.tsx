import styled from 'styled-components';

const RetryButton = () => {
  return <Button onClick={() => location.reload()}>고민 다시 등록하기</Button>;
};

export default RetryButton;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.write_purple100};
  color: ${({ theme }) => theme.colors.write_white200};
  border-radius: 14px;
  border: none;
  padding: 1rem;
  width: 100%;
  margin: 1.5rem 0 0.5rem 0;
`;
