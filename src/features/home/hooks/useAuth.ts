import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loginApi, signUpApi } from '../auth';
import { useState } from 'react';

interface ErrorModalState {
  isOpen: boolean;
  message: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState<ErrorModalState>({
    isOpen: false,
    message: '',
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 토큰 저장 로직 유지
      Cookies.set('access_token', data.access_token, {
        expires: 1,
        // secure: true,
        sameSite: 'strict',
        path: '/',
      });

      Cookies.set('refresh_token', data.refresh_token, {
        expires: 7,
        // secure: true,
        sameSite: 'strict',
        path: '/',
      });

      Cookies.set('user_id', data.user_id.toString(), {
        expires: 7,
        // secure: true,
        sameSite: 'strict',
        path: '/',
      });
      Cookies.set('nickname', data.nickname, {
        expires: 7,
        // secure: true,
        sameSite: 'strict',
        path: '/',
      });

      navigate('/growth');
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorModal({
            isOpen: true,
            message: '아이디 또는 비밀번호가 올바르지 않습니다.',
          });
        } else if (error.response?.status === 422) {
          setErrorModal({
            isOpen: true,
            message: '아이디와 비밀번호는 필수 입력값입니다.',
          });
        } else {
          setErrorModal({
            isOpen: true,
            message: '로그인 중 오류가 발생했습니다.',
          });
        }
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      setErrorModal({
        isOpen: true,
        message: '회원가입이 완료되었습니다.',
      });
      // 모달 닫힐 때 페이지 이동하도록 수정
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrorModal({
            isOpen: true,
            message: '이미 존재하는 아이디입니다.',
          });
        } else if (error.response?.status === 422) {
          setErrorModal({
            isOpen: true,
            message: '입력값이 올바르지 않습니다.',
          });
        } else {
          setErrorModal({
            isOpen: true,
            message: '회원가입 중 오류가 발생했습니다.',
          });
        }
      }
    },
  });

  const handleCloseModal = () => {
    setErrorModal({ isOpen: false, message: '' });
    // 회원가입 성공 시 로그인 페이지로 이동
    if (signUpMutation.isSuccess) {
      navigate('/login');
    }
  };

  return { loginMutation, signUpMutation, errorModal, handleCloseModal };
};
