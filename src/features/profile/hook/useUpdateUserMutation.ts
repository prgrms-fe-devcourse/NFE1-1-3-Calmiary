import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  UpdateProfileDataPropTypes,
  UpdateProfileOptionsPropTypes,
} from '../types/profileTypes';

const updateProfile = async ({
  userId,
  nickname,
  password,
}: UpdateProfileDataPropTypes) => {
  const response = await axios.patch(`/api/profile/update/${userId}`, {
    nickname,
    password,
  });
  return response.data;
};

export const useUpdateProfile = (options?: UpdateProfileOptionsPropTypes) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile, // API 호출 함수
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['userData', variables.userId],
      });

      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error: Error) => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
