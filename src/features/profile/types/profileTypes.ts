import { ReactNode } from 'react';

export interface PostPropTypes {
  id: number;
  content: string;
  like_count: number;
  created_at: string;
  nickname: string;
  comment_count: number;
  user_info: { nickname: string; profile_image: string };
}

export type SortOption = '최신순' | '좋아요순' | '오래된순';

export interface UserPostPropTypes {
  content: string;
  likes: number;
  createdAt: string;
  nickname: string;
  comments: number;
  profileImg: string;
  id: number;
}

export interface FormValuesPropTypes {
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdateProfileDataPropTypes {
  userId: string;
  nickname: string;
  password: string;
}

export interface UpdateProfileOptionsPropTypes {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface ModalPropTypes {
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
  isSuccess?: boolean;
  children: ReactNode;
}
