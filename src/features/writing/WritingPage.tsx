import styled from 'styled-components';

const WritingPage = () => {
  return (
    <WritingWrapper>
      <WritingLayout></WritingLayout>
    </WritingWrapper>
  );
};

export default WritingPage;

const WritingWrapper = styled.div`
  background: ${({ theme }) => theme.colors.brand_bg};
  height: 100vh;
`;

const WritingLayout = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 1rem 0 1rem 0;
`;
