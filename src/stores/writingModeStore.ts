import { create } from 'zustand';

interface State {
  isQuestionMode: boolean;
  isInputMode: boolean;
  isUserResponseMode: boolean;
  isLoadingMode: boolean;
  isAIResponseMode: boolean;
  isErrorMode: boolean;
  isEndMode: boolean;
}

interface Actions {
  actions: {
    setIsQuestionMode: (mode: boolean) => void;
    setIsInputMode: (mode: boolean) => void;
    setIsUserResponseMode: (mode: boolean) => void;
    setIsLoadingMode: (mode: boolean) => void;
    setIsAIResponseMode: (mode: boolean) => void;
    setIsErrorMode: (mode: boolean) => void;
    setIsEndMode: (mode: boolean) => void;
    resetMode: () => void;
  };
}

const useWritingModeStore = create<State & Actions>((set) => ({
  isQuestionMode: false,
  isInputMode: false,
  isUserResponseMode: false,
  isLoadingMode: false,
  isAIResponseMode: false,
  isErrorMode: false,
  isEndMode: false,
  actions: {
    setIsQuestionMode: (mode) => set(() => ({ isQuestionMode: mode })),
    setIsInputMode: (mode) => set(() => ({ isInputMode: mode })),
    setIsUserResponseMode: (mode) => set(() => ({ isUserResponseMode: mode })),
    setIsLoadingMode: (mode) => set(() => ({ isLoadingMode: mode })),
    setIsAIResponseMode: (mode) => set(() => ({ isAIResponseMode: mode })),
    setIsErrorMode: (mode) => set(() => ({ isErrorMode: mode })),
    setIsEndMode: (mode) => set(() => ({ isEndMode: mode })),
    resetMode: () =>
      set(() => ({
        isQuestionMode: false,
        isInputMode: false,
        isUserResponseMode: false,
        isLoadingMode: false,
        isAIResponseMode: false,
        isErrorMode: false,
        isEndMode: false,
      })),
  },
}));

export default useWritingModeStore;
