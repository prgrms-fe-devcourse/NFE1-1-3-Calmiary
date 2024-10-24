import { create } from 'zustand';

interface State {
  emotion: string;
  content: string;
}

interface Actions {
  actions: {
    setEmotion: (newEmotion: string) => void;
    setContent: (newContent: string) => void;
  };
}

const useWritingStore = create<State & Actions>((set) => ({
  emotion: '',
  content: '',
  actions: {
    setEmotion: (newEmotion) => set(() => ({ emotion: newEmotion })),
    setContent: (newContent) => set(() => ({ content: newContent })),
  },
}));

export default useWritingStore;
