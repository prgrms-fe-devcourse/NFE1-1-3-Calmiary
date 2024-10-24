import styled from 'styled-components';

const MoveToMainButton = () => {
  return <Button>메인으로 돌아가기</Button>;
};

export default MoveToMainButton;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.write_white100};
  color: ${({ theme }) => theme.colors.write_purple100};
  border-radius: 14px;
  border: none;
  padding: 1rem;
  width: 100%;
  margin: 0 0 1.5rem 0;
`;
