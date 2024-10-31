export type SortKey = 'latest' | 'oldest' | 'likes';
export type SortOptions = Record<SortKey, string>;

export interface UserDataType {
  nickname: string;
  profile_image: string;
}

export interface PostTypes extends BasePostTypes {
  user_info: UserDataType;
}

export interface PostContentPropTypes {
  content: string;
}

export interface BasePostTypes {
  id: number;
  user_id: number;
  emotion_type: string;
  content: string;
  ai_content: string;
  created_at: Date;
  is_shared: boolean;
  is_solved: boolean;
  like_count: number;
  comment_count: number;
}
