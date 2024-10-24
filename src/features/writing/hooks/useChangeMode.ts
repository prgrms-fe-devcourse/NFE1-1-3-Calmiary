import { useEffect } from 'react';
import useWritingModeStore from '../../../stores/writingModeStore';

const useChangeMode = () => {
  const { isQuestionMode, isAIResponseMode } = useWritingModeStore(
    (state) => state
  );
  const {
    setIsQuestionMode,
    setIsInputMode,
    setIsUserResponseMode,
    setIsEndMode,
  } = useWritingModeStore((state) => state.actions);

  useEffect(() => {
    setTimeout(() => {
      setIsQuestionMode(true);
      console.log(1);
    }, 1000);
  }, [setIsQuestionMode]);

  useEffect(() => {
    if (!isQuestionMode) return;

    setTimeout(() => {
      setIsInputMode(true);
      console.log(2);
    }, 1500);
  }, [isQuestionMode, setIsUserResponseMode, setIsInputMode]);

  useEffect(() => {
    if (!isAIResponseMode) return;

    setTimeout(() => {
      setIsEndMode(true);
      console.log(4);
    }, 2000);
  }, [isAIResponseMode, setIsEndMode]);
};

export default useChangeMode;
