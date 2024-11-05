import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import useMoveForm from '../hooks/useMoveForm';

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
  const handleConfirm = useMoveForm();

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
