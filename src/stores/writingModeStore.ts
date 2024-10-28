import { create } from 'zustand';

interface State {
  isQuestionMode: boolean;
  isInputMode: boolean;
  isUserResponseMode: boolean;
  isAIResponseMode: boolean;
  isEndMode: boolean;
}

interface Actions {
  actions: {
    setIsQuestionMode: (mode: boolean) => void;
    setIsInputMode: (mode: boolean) => void;
    setIsUserResponseMode: (mode: boolean) => void;
    setIsAIResponseMode: (mode: boolean) => void;
    setIsEndMode: (mode: boolean) => void;
  };
}

const useWritingModeStore = create<State & Actions>((set) => ({
  isQuestionMode: false,
  isInputMode: false,
  isUserResponseMode: false,
  isAIResponseMode: false,
  isEndMode: false,
  actions: {
    setIsQuestionMode: (mode) => set(() => ({ isQuestionMode: mode })),
    setIsInputMode: (mode) => set(() => ({ isInputMode: mode })),
    setIsUserResponseMode: (mode) => set(() => ({ isUserResponseMode: mode })),
    setIsAIResponseMode: (mode) => set(() => ({ isAIResponseMode: mode })),
    setIsEndMode: (mode) => set(() => ({ isEndMode: mode })),
  },
}));

export default useWritingModeStore;
