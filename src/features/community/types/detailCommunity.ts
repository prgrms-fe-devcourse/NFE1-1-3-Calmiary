import { MouseEventHandler } from 'react';
import { PostTypes } from './index';

export interface PostProps extends Partial<PostTypes> {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}
