import styled from 'styled-components';

interface ContentPublicButtonPropTypes {
  onClick: () => void;
}
const ContentPublicButton = ({ onClick }: ContentPublicButtonPropTypes) => {
  return <Button onClick={onClick}>내 고민 공유하기</Button>;
};

export default ContentPublicButton;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.write_purple100};
  color: ${({ theme }) => theme.colors.write_white200};
  border-radius: 14px;
  border: none;
  padding: 1rem;
  width: 100%;
  margin: 1.5rem 0 0.5rem 0;
  font-size: 16px;
  font-weight: bold;
`;
