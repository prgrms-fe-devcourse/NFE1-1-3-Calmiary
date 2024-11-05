import { MouseEventHandler } from 'react';
import { PostTypes, BasePostTypes } from './index';

export interface DetailPostTypes extends BasePostTypes {
  comments: CommentDataType[];
  nickname: string;
  profileImage: string;
}

export interface CommentDataType {
  comment_id: number;
  user_id: number;
  nickname: string;
  content: string;
  created_at: Date;
}

export interface CommentsContentPropTypes {
  comment: CommentDataType[] | undefined;
  postId: number | undefined;
  userId: number | undefined;
  refetchComments: () => void;
}
export interface PostProps extends Partial<PostTypes> {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}
