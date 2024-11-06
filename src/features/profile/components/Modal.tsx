import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface ModalPropTypes {
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
  isSuccess?: boolean;
  children: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  buttonText = '확인',
  isSuccess = false,
  children,
}: ModalPropTypes) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          <StatusIcon isSuccess={isSuccess}>{isSuccess ? '✓' : '!'}</StatusIcon>
          <ModalBody>{children}</ModalBody>
          <ButtonGroup>
            <ConfirmButton onClick={onClose}>{buttonText}</ConfirmButton>
          </ButtonGroup>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

const StatusIcon = styled.div<{ isSuccess: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.diary_100};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: 2px solid ${({ theme }) => theme.colors.diary_100};
`;

const ModalBody = styled.div`
  color: ${({ theme }) => theme.colors.write_white200};
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  word-break: keep-all;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const ConfirmButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.diary_100};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export default Modal;
