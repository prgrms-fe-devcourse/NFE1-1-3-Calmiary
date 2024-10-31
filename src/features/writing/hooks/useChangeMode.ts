import { useEffect } from 'react';
import useWritingModeStore from '../../../stores/writingModeStore';
import useWritingResponseStore from '../../../stores/writingResponseStore';

const useChangeMode = () => {
  const { isQuestionMode, isEndMode } = useWritingModeStore((state) => state);
  const { AiContent } = useWritingResponseStore((state) => state);
  const {
    setIsQuestionMode,
    setIsInputMode,
    setIsUserResponseMode,
    setIsEndMode,
  } = useWritingModeStore((state) => state.actions);

  useEffect(() => {
    setTimeout(() => {
      setIsQuestionMode(true);
    }, 1000);
  }, [setIsQuestionMode]);

  useEffect(() => {
    if (!isQuestionMode || isEndMode) return;

    setTimeout(() => {
      setIsInputMode(true);
    }, 1500);
  }, [isQuestionMode, isEndMode, setIsUserResponseMode, setIsInputMode]);

  useEffect(() => {
    if (!AiContent) return;

    setTimeout(() => {
      setIsEndMode(true);
    }, 1000);
  }, [AiContent, setIsEndMode]);

  useEffect(() => {
    if (isQuestionMode && isEndMode) {
      setIsInputMode(false);
    }
  }, [isQuestionMode, isEndMode, setIsInputMode]);
};

export default useChangeMode;
