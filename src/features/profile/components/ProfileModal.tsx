import styled from 'styled-components';
import ProfileButton from './ProfileButton';
import { Icon } from '../../../components/ui/Icon';

interface ProfileModalPropTypes {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalPropTypes) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose}>
          <Icon type="close_x" alt="닫기" size={24} />
        </button>
        <ModalHeader>탈퇴하기</ModalHeader>
        <div>
          <ModalContent>탈퇴한 후에는</ModalContent>
          <ModalContent>
            <span>'모든 기록'</span>이 사라집니다.
          </ModalContent>
        </div>
        <ModalContent>내용을 확인하셨다면 버튼을 누르세요</ModalContent>

        <ProfileButton width={'180px'} height={'52px'} color={'#65558F'}>
          확인하기
        </ProfileButton>
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

const ModalHeader = styled.h2`
  font-size: 1rem;
  color: #181a20;
`;

const ModalContent = styled.p`
  font-size: 1rem;
  color: #181a20;
  text-align: center;
`;
