import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MoveToMainButton = () => {
  return <Button to="/growth">메인으로 돌아가기</Button>;
};

export default MoveToMainButton;

const Button = styled(Link)`
  background: ${({ theme }) => theme.colors.write_white100};
  color: ${({ theme }) => theme.colors.write_purple100};
  border-radius: 14px;
  border: none;
  padding: 1rem;
  width: 100%;
  font-size: 16px;
  font-weight: bold;

  text-decoration: none;
  display: block;
  text-align: center;
  cursor: pointer;
`;
