import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

interface UseUpdateProfileImageOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export const useUpdateProfileImage = (
  userId: string,
  options?: UseUpdateProfileImageOptions
) => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.put(
        `/profile/${userId}/profile-image`,
        formData
      );
      return data;
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || '이미지 업로드에 실패했습니다.';
        options?.onError?.(new Error(errorMessage));
      } else if (error instanceof Error) {
        options?.onError?.(error);
      }
    },
    onSettled: () => {
      options?.onSettled?.();
    },
  });
};
