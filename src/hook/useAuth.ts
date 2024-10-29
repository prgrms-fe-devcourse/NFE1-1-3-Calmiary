import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi, signUpApi } from '../features/home/auth';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // 토큰 저장
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

      // 로그인 성공 후 페이지 이동
      navigate('/diary');
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        } else if (error.response?.status === 422) {
          alert('아이디와 비밀번호는 필수 입력값입니다.');
        } else {
          alert('로그인 중 오류가 발생했습니다.');
        }
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert('이미 존재하는 아이디입니다.');
        } else if (error.response?.status === 422) {
          alert('입력값이 올바르지 않습니다.');
        } else {
          alert('회원가입 중 오류가 발생했습니다.');
        }
      }
    },
  });

  return { loginMutation, signUpMutation };
};
