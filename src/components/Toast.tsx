import styled, { keyframes } from 'styled-components';
import useToastStore from '../stores/toastStore';

const Toast = () => {
  const { isToastOpen, toastType, toastMessage } = useToastStore();

  if (!isToastOpen) return null;
  return <Div type={toastType}>{toastMessage}</Div>;
};

export default Toast;

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translate(50%, 10px);
  }
  100% {
    opacity: 1;
    transform: translate(50%, 0);
  }
`;

const Div = styled.div<{ type?: 'success' | 'fail' | null }>`
  z-index: 1001;
  position: fixed;
  top: 1rem;
  right: 50%;
  transform: translateX(50%);
  animation: ${slideDown} 0.5s ease forwards;
  width: auto;
  padding: 0.8rem 1rem;
  color: #ffffff;
  border-radius: 14px;
  background-color: ${({ type, theme }) =>
    type === 'success' ? theme.colors.system_blue : theme.colors.system_red};
`;
