import { axiosInstance } from '../../../network/axiosInstance';
import { Post } from '../types/diaryTypes';

interface GetPostsParams {
  user_id: number;
  year?: number;
  month?: number;
  is_shared?: boolean;
}

export const togglePostSolution = async (postId: number, userId: number) => {
  const { data } = await axiosInstance.patch<Post>(
    `/diary/post/${postId}/solve`,
    { user_id: userId }
  );
  return data;
};

export const getPosts = async ({
  user_id,
  year,
  month,
  is_shared,
}: GetPostsParams) => {
  const { data } = await axiosInstance.get<Post[]>('/diary/posts', {
    params: {
      user_id,
      year,
      month,
      is_shared,
    },
  });
  return data;
};

export const togglePostVisibility = async (postId: number, userId: number) => {
  const { data } = await axiosInstance.patch<Post>(
    `/diary/post/${postId}/visibility`,
    { user_id: userId }
  );
  return data;
};

export const getPostDetail = async (postId: number) => {
  const { data } = await axiosInstance.get<Post>(`/diary/post/${postId}`);
  return data;
};
