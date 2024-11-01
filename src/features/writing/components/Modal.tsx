import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../home/hooks/useUser';
import showToast from '../utils/showToast';
import { VisibilityDataTypes } from '../types/formTypes';

interface ModalPropTypes {
  onClose: () => void;
  header: string;
  contentFirst: string;
  contentSecond: string;
}

interface ButtonPropTypes {
  width?: string;
  height?: string;
  color?: string;
  opacity?: number;
}

export default function Modal(props: ModalPropTypes) {
  // 화면 이동 로직
  const navigate = useNavigate();

  // 사용자 정보 불러오는 로직
  const { getUserId } = useUser();
  const userId = getUserId().user_id;

  // 서버로 정보 전송 로직
  const mutation = useMutation({
    mutationFn: async (userId: VisibilityDataTypes) => {
      await axios.patch(`/api/diary/post/${contentId}/visibility`, userId);
    },
    onSuccess: () => {
      navigate(`/detail/community/${contentId}`);
      window.scrollTo(0, 0);
    },
    onError: () => {
      showToast({
        type: 'fail',
        message: '😢 공개 설정에 실패했습니다! ',
      });
    },
  });

  // 클라이언트 정보 불러오는 로직
  const { contentId } = useWritingResponseStore((state) => state);

  // 클라이언트 정보 관리하는 로직
  const handleConfirm = () => {
    mutation.mutate({
      user_id: userId,
    });
    showToast({
      type: 'success',
      message: '🙌 고민에 대한 조언을 받아보세요!',
    });
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

const Button = styled.button<ButtonPropTypes>`
  width: ${({ width }) => width || '264px'};
  height: ${({ height }) => height || '57px'};
  background-color: ${({ color }) => color || '#9C99AE'};
  opacity: ${({ opacity }) => (opacity !== undefined ? opacity : 1)};
  border: none;
  border-radius: 1rem;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;
