import { axiosInstance } from '../../../network/axiosInstance';

interface PostStats {
  this_week_posts: number;
  total_posts: number;
  resolved_posts: number;
}

export const fetchUserStats = async (userId: string): Promise<PostStats> => {
  const { data } = await axiosInstance.get<PostStats>(`/stats/posts/${userId}`);
  return data;
};
