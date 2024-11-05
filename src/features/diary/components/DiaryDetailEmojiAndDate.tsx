import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { getEmojiType } from './DiaryEmoji';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../home/hooks/useUser';
import { useState } from 'react';
import { togglePostSolution } from '../api/diary';
import {
  ConfirmModalPropTypes,
  DiaryDetailEmojiAndDatePropTypes,
} from '../types/diaryTypes';

const ConfirmModal = ({ onConfirm, onCancel }: ConfirmModalPropTypes) => {
  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContent
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <ModalTitle>고민이 해결되었나요?</ModalTitle>
        <ModalText>해결된 고민은 다시 되돌릴 수 없어요.</ModalText>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>아니요</CancelButton>
          <ConfirmButton onClick={onConfirm}>네, 해결했어요!</ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

const DiaryDetailEmojiAndDate = ({
  id,
  emotionType,
  createdAt,
  isSolved,
}: DiaryDetailEmojiAndDatePropTypes) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const { getUserId } = useUser();
  const userId = getUserId().user_id;
  const queryClient = useQueryClient();

  const formattedDate = new Date(createdAt).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
  });

  const { mutate: toggleSolution } = useMutation({
    mutationFn: () => togglePostSolution(id, Number(userId)),
    onSuccess: async () => {
      // 애니메이션이 완료될 때까지 대기 후 이동
      await new Promise((resolve) => setTimeout(resolve, 2000));
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      navigate('/diary');
    },
  });

  const handleEmojiClick = () => {
    if (!isSolved) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    toggleSolution();
  };

  return (
    <>
      <DiaryDetailEmojiAndDateWrapper>
        <EmojiContainer onClick={handleEmojiClick}>
          <motion.div
            initial={{ scale: 1 }}
            animate={
              isSolved
                ? {
                    scale: [1, 1.2, 0.8, 1.1, 1],
                    y: [0, -20, 0],
                    rotate: [0, -10, 10, -5, 0],
                  }
                : { scale: 1 }
            }
            transition={{ duration: 1 }}
          >
            <Icon type={getEmojiType(emotionType)} size={55} />
          </motion.div>

          {isSolved && (
            <SolvedMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              해결된 고민이에요!
            </SolvedMessage>
          )}
        </EmojiContainer>
        <DateText>{formattedDate}의 고민</DateText>
      </DiaryDetailEmojiAndDateWrapper>

      <AnimatePresence>
        {showConfirmModal && (
          <ConfirmModal
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const DiaryDetailEmojiAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 11.33dvh;
  margin-bottom: 20px;
  font-size: 14px;
  position: relative;
`;

const SolvedMessage = styled(motion.div)`
  color: ${({ theme }) => theme.colors.write_white200};
  font-size: 14px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.diary_100};
  padding: 6px 12px;
  border-radius: 20px;
  // margin-top: 8px;
`;

const EmojiContainer = styled(motion.div)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
`;

const DateText = styled.p`
  margin-top: 8px;
`;

export default DiaryDetailEmojiAndDate;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  padding: 24px;
  border-radius: 16px;
  width: 80%;
  max-width: 320px;
  border: 2px solid ${({ theme }) => theme.colors.diary_100};
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.write_white200};
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.write_white200};
  opacity: 0.8;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.diary_100};
  color: ${({ theme }) => theme.colors.write_white200};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.diary_100};
  border: none;
  color: ${({ theme }) => theme.colors.write_white200};

  &:hover {
    opacity: 0.9;
  }
`;
