import { toastStore } from '../../../stores/toastStore';
import ToastType from '../types/toastTypes';

interface useToastPropTypes {
  type: ToastType;
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
