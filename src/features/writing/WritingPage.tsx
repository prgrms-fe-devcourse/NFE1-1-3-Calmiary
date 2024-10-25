import styled from 'styled-components';
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

const WritingPage = () => {
  const {
    isQuestionMode,
    isInputMode,
    isUserResponseMode,
    isAIResponseMode,
    isEndMode,
  } = useWritingModeStore((state) => state);
  useChangeMode();
  return (
    <WritingWrapper>
      <WritingLayout>
        {isQuestionMode && <QuestionBox comment="오늘 어떤 고민이 있나요?" />}
        {isUserResponseMode && (
          <ResponseBoxContainer>
            <ResponseBox />
          </ResponseBoxContainer>
        )}
        {isAIResponseMode && (
          <QuestionBox comment="" loadingSpinner={<LoadingSpinner />} />
        )}
        {isInputMode && (
          <InputContainer>
            <EntireInput />
          </InputContainer>
        )}
        {isEndMode && (
          <ButtonContainer>
            <ContentPublicButton />
            <MoveToMainButton />
          </ButtonContainer>
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

const InputContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 5rem;
  transform: translateX(-50%);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 270px;
  margin: auto;
`;
