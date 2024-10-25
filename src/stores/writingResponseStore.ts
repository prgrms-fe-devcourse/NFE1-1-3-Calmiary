import { create } from 'zustand';

interface State {
  emotion: string;
  content: string;
  isInputMode: boolean;
}

interface Actions {
  actions: {
    setEmotion: (newEmotion: string) => void;
    setContent: (newContent: string) => void;
    setIsInputMode: (inputMode: boolean) => void;
  };
}

const useWritingResponseStore = create<State & Actions>((set) => ({
  emotion: '',
  content: '',
  isInputMode: true,
  actions: {
    setEmotion: (newEmotion) => set(() => ({ emotion: newEmotion })),
    setContent: (newContent) => set(() => ({ content: newContent })),
    setIsInputMode: (inputMode) => set(() => ({ isInputMode: inputMode })),
  },
}));

export default useWritingResponseStore;
