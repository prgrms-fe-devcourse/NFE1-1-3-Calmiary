import styled, { keyframes } from 'styled-components';
import {
  ContentPublicButton,
  EntireInput,
  LoadingSpinner,
  MoveToMainButton,
  QuestionBox,
  ResponseBox,
  RetryButton,
} from './components';
import useWritingModeStore from '../../stores/writingModeStore';
import useChangeMode from './hooks/useChangeMode';
import useWritingResponseStore from '../../stores/writingResponseStore';
import { useRef, useState } from 'react';
import Modal from './components/Modal';
import useScrollFollow from './hooks/useScrollFollow';
import Toast from '../../components/Toast';
import useToastStore from '../../stores/toastStore';
import Navbar from '../../components/Navbar';

const WritingPage = () => {
  const {
    isQuestionMode,
    isInputMode,
    isUserResponseMode,
    isAIResponseMode,
    isErrorMode,
    isEndMode,
  } = useWritingModeStore((state) => state);
  useChangeMode();
  const { AiContent } = useWritingResponseStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isToastOpen } = useToastStore((state) => state);

  const contentRef = useRef<HTMLDivElement>(null);
  useScrollFollow({
    contentRef,
    dependencies: [
      isQuestionMode,
      isUserResponseMode,
      isAIResponseMode,
      isEndMode,
    ],
  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <WritingWrapper ref={contentRef}>
      <WritingLayout>
        <Navbar />
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
              {isErrorMode ? (
                <RetryButton />
              ) : (
                <ContentPublicButton onClick={openModal} />
              )}
              <MoveToMainButton />
            </ButtonContainer>
          </FadeIn>
        )}

        {isModalOpen && (
          <Modal
            onClose={closeModal}
            header="내 고민 공유하기"
            contentFirst="고민을 공유한 후에는"
            contentSecond="비공개로 전환할 수 없습니다!"
          />
        )}

        {isToastOpen && <Toast />}
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
  font-size: 15px;
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
  animation: ${fadeIn} 0.5s ease forwards;
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
  animation: fadeIn 0.5s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
