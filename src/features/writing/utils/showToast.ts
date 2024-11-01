import { toastStore } from '../../../stores/toastStore';

interface useToastPropTypes {
  type: 'success' | 'fail';
  message: string;
}

const showToast = ({ type, message }: useToastPropTypes) => {
  const { setIsToastOpen, setToastType, setToastMessage } =
    toastStore.getState().actions;

  setIsToastOpen(true);
  setToastType(type);
  setToastMessage(message);

  setTimeout(() => {
    setIsToastOpen(false);
  }, 1500);
};

export default showToast;
