import { create } from 'zustand';

interface State {
  isToastOpen: boolean;
  toastType: null | 'success' | 'fail';
  toastMessage: null | string;
}

interface Actions {
  actions: {
    setIsToastOpen: (mode: boolean) => void;
    setToastType: (type: 'success' | 'fail') => void;
    setToastMessage: (message: string) => void;
  };
}

const useToastStore = create<State & Actions>((set) => ({
  isToastOpen: false,
  toastType: null,
  toastMessage: null,
  actions: {
    setIsToastOpen: (mode) => set(() => ({ isToastOpen: mode })),
    setToastType: (type) => set(() => ({ toastType: type })),
    setToastMessage: (message) => set(() => ({ toastMessage: message })),
  },
}));

export const toastStore = useToastStore;
export default useToastStore;
