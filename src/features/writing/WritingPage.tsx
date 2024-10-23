import styled from 'styled-components';
import { QuestionBox, ResponseBox } from './components';

const WritingPage = () => {
  return (
    <WritingWrapper>
      <WritingLayout>
        <QuestionBox />
        <ResponseBox />
        <QuestionBox />
      </WritingLayout>
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
`;
