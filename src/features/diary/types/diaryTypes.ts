export type FilterType = '전체' | '공개' | '비공개';

export interface Post {
  id: number;
  user_id: number;
  emotion_type: string;
  content: string;
  ai_content: string;
  created_at: string;
  is_shared: boolean;
  is_solved: boolean;
}

export interface DiaryCalminaryAnswerPropTypes {
  aiContent: string;
}

export interface DiaryDetailEmojiAndDatePropTypes {
  id: number;
  emotionType: string;
  createdAt: string;
  isSolved: boolean;
}

export interface ConfirmModalPropTypes {
  onConfirm: () => void;
  onCancel: () => void;
}

export type EmojiUnionType =
  | 'write_emotion_soso'
  | 'write_emotion_cry'
  | 'write_emotion_smile'
  | 'write_emotion_scary'
  | 'write_emotion_angry';

export interface DiaryEmojiPropTypes {
  posts?: Post[];
}

export interface DiaryFilterPropTypes {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export interface DiaryMonthPropTypes {
  currentMonth: number;
  onMonthChange: (month: number) => void;
}

export interface DiaryMyWorryPropTypes {
  id: number;
  content: string;
  isShared: boolean;
  isSolved: boolean;
}

export interface DiaryTitlePropTypes {
  showInfo?: boolean;
}

export interface SwitchPropTypes {
  checked: boolean;
  onChange: () => void;
}
