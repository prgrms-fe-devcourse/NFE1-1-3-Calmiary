import { create } from 'zustand';

interface State {
  emotion: string;
  content: string;
  isInputMode: boolean;
  AiContent: string;
  contentId: number;
}

interface Actions {
  actions: {
    setEmotion: (newEmotion: string) => void;
    setContent: (newContent: string) => void;
    setIsInputMode: (inputMode: boolean) => void;
    setAiContent: (newContent: string) => void;
    setContentId: (newId: number) => void;
  };
}

const useWritingResponseStore = create<State & Actions>((set) => ({
  emotion: '',
  content: '',
  isInputMode: true,
  AiContent: '',
  contentId: 0,
  actions: {
    setEmotion: (newEmotion) => set(() => ({ emotion: newEmotion })),
    setContent: (newContent) => set(() => ({ content: newContent })),
    setIsInputMode: (inputMode) => set(() => ({ isInputMode: inputMode })),
    setAiContent: (newContent) => set(() => ({ AiContent: newContent })),
    setContentId: (newId) => set(() => ({ contentId: newId })),
  },
}));

export default useWritingResponseStore;
