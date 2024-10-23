import styled from 'styled-components';

const ContentPublicButton = () => {
  return <Button>내 고민 공유하기</Button>;
};

export default ContentPublicButton;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.write_purple100};
  color: ${({ theme }) => theme.colors.write_white200};
  border-radius: 14px;
  border: none;
  padding: 1rem;
  width: 100%;
  margin: 0.5rem 0;
`;
