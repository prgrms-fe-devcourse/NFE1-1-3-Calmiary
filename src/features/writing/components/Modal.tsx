import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import Button from './Button';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ModalPropTypes {
  onClose: () => void;
  header: string;
  contentFirst: string;
  contentSecond: string;
}

interface VisibilityData {
  user_id: number;
}

export default function Modal(props: ModalPropTypes) {
  const { contentId } = useWritingResponseStore((state) => state);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (userId: VisibilityData) => {
      await axios.patch(`/api/diary/post/${contentId}/visibility`, userId);
    },
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('fail');
    },
  });

  const handleConfirm = () => {
    mutation.mutate({
      user_id: 5,
    });
    navigate(`/detail/community/${contentId}`);
  };

  return (
    <ModalOverlay onClick={props.onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={props.onClose}>
          <Icon type="close_x" alt="닫기" size={24} />
        </button>
        <ModalHeader>{props.header}</ModalHeader>
        <div>
          <ModalContent>{props.contentFirst}</ModalContent>
          <ModalContent>{props.contentSecond}</ModalContent>
        </div>
        <ModalContent>내용을 확인하셨다면 버튼을 누르세요</ModalContent>

        <Button
          onClick={handleConfirm}
          width="180px"
          height="52px"
          color="#65558F"
        >
          확인하기
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background: ${({ theme }) => theme.colors.modal_purple100};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  .modalClose {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    border: none;
    background-color: inherit;
  }
`;

const ModalHeader = styled.div`
  font-size: 1rem;
  color: #181a20;
`;

const ModalContent = styled.p`
  font-size: 1rem;
  color: #181a20;
  text-align: center;
`;
