import styled, { keyframes } from 'styled-components';
import {
  ContentPublicButton,
  EntireInput,
  LoadingSpinner,
  MoveToMainButton,
  QuestionBox,
  ResponseBox,
} from './components';
import useWritingModeStore from '../../stores/writingModeStore';
import useChangeMode from './hooks/useChangeMode';
import useWritingResponseStore from '../../stores/writingResponseStore';

const WritingPage = () => {
  const {
    isQuestionMode,
    isInputMode,
    isUserResponseMode,
    isAIResponseMode,
    isEndMode,
  } = useWritingModeStore((state) => state);
  useChangeMode();
  const { AiContent } = useWritingResponseStore((state) => state);

  return (
    <WritingWrapper>
      <WritingLayout>
        {isQuestionMode && (
          <FadeIn>
            <QuestionBox comment="오늘 어떤 고민이 있나요?" />
          </FadeIn>
        )}
        {isUserResponseMode && (
          <FadeIn>
            <ResponseBoxContainer>
              <ResponseBox />
            </ResponseBoxContainer>
          </FadeIn>
        )}
        {isAIResponseMode && (
          <FadeIn>
            <QuestionBox
              comment={AiContent}
              loadingSpinner={<LoadingSpinner />}
            />
          </FadeIn>
        )}
        {isInputMode && (
          <InputContainer>
            <EntireInput />
          </InputContainer>
        )}
        {isEndMode && (
          <FadeIn>
            <ButtonContainer>
              <ContentPublicButton />
              <MoveToMainButton />
            </ButtonContainer>
          </FadeIn>
        )}
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
  min-height: 100vh;
`;

const WritingLayout = styled.div`
  max-width: 390px;
  margin: 4.5rem auto;
`;

const ResponseBoxContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const fadeIn = keyframes`
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const InputContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 5rem;
  transform: translate(-50%, 20px);
  animation: ${fadeIn} 0.5s forwards;
  opacity: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 270px;
  margin: auto;
`;

const FadeIn = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
