import { MouseEventHandler } from 'react';
import { PostTypes, BasePostTypes } from './index';

export interface DetailPostTypes extends BasePostTypes {
  comments: CommentDataType;
}

interface CommentDataType {
  comment_id: number;
  user_id: number;
  content: string;
  created_at: Date;
}
export interface PostProps extends Partial<PostTypes> {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}
