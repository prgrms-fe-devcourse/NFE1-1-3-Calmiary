import styled from 'styled-components';
import {
  ContentInput,
  ContentPublicButton,
  EmotionInput,
  MoveToMainButton,
  QuestionBox,
  ResponseBox,
} from './components';

const WritingPage = () => {
  return (
    <WritingWrapper>
      <WritingLayout>
        <QuestionBox />
        <ResponseBoxContainer>
          <ResponseBox />
        </ResponseBoxContainer>
        <QuestionBox />
        <EmotionInput />
        <ContentInput />
        <ButtonContainer>
          <ContentPublicButton />
          <MoveToMainButton />
        </ButtonContainer>
      </WritingLayout>
    </WritingWrapper>
  );
};

export default WritingPage;

const WritingWrapper = styled.div`
  background: ${({ theme }) => theme.colors.brand_bg};
  background-image: url('/src/assets/write-background.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100vh;
`;

const WritingLayout = styled.div`
  max-width: 390px;
  margin: 4.5rem auto;
`;

const ResponseBoxContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 270px;
  margin: auto;
`;
