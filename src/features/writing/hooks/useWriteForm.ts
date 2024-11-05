import { SubmitHandler, useForm } from 'react-hook-form';
import useWritingModeStore from '../../../stores/writingModeStore';
import useWritingResponseStore from '../../../stores/writingResponseStore';
import { useUser } from '../../home/hooks/useUser';
import useWriteMutation from './useWriteMutation';
import { FormTypes, WriteDataTypes } from '../types/formTypes';
import showToast from '../utils/showToast';
import axios from 'axios';

const useWriteForm = () => {
  // 사용자 정보 불러오는 로직
  const { getUserId } = useUser();
  const userId = getUserId().user_id;

  // 서버로 정보 전송 로직
  // const mutation = useWriteMutation();

  // 클라이언트 정보 불러오는 로직
  const { setEmotion, setContent, setAiContent, setContentId } =
    useWritingResponseStore((state) => state.actions);

  const {
    setIsInputMode,
    setIsUserResponseMode,
    setIsLoadingMode,
    setIsErrorMode,
    setIsAIResponseMode,
  } = useWritingModeStore((state) => state.actions);

  // 클라이언트 정보 관리하는 로직
  const { register, handleSubmit, reset, setFocus } = useForm<FormTypes>();

  const handleSubmitContent: SubmitHandler<FormTypes> = (data) => {
    if (data.emotion === null) {
      showToast({
        type: 'fail',
        message: '😮 감정을 선택해주세요!',
      });
      return;
    }

    if (data.content.trim() === '') {
      showToast({
        type: 'fail',
        message: '✏️ 고민을 입력해주세요!',
      });
      return;
    }

    setEmotion(data.emotion);
    setContent(data.content);
    setIsInputMode(false);

    setTimeout(() => {
      setIsUserResponseMode(true);
    }, 1000);
    setTimeout(() => {
      setIsLoadingMode(true);
      setIsAIResponseMode(true);
    }, 2000);

    // mutation.mutate({
    //   user_id: userId,
    //   emotion_type: data.emotion,
    //   content: data.content,
    // });

    postData({
      user_id: userId,
      emotion_type: data.emotion,
      content: data.content,
    });

    Promise.resolve()
      .then(() => reset())
      .then(() => setFocus('content'));
  };

  const api = axios.create({
    baseURL: 'http://calmiary-be.org',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const postData = async (wrietData: WriteDataTypes) => {
    console.log(wrietData);
    try {
      const response = await axios.post('/api/post/write', wrietData);
      console.log('ok');
      const data = await response.data;
      setAiContent(data.ai_content);
      setContentId(data.id);
      setIsLoadingMode(false);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setAiContent('고민 등록에 실패했습니다 😢');
        setContentId(0);
        setIsLoadingMode(false);
        setIsErrorMode(true);
      }, 2500);
    }
  };
  return { register, handleSubmit, handleSubmitContent };
};

export default useWriteForm;
