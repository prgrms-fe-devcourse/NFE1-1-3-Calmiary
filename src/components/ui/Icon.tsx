import styled from 'styled-components';

import close_x from '../../assets/close-x.svg';
import community_comment from '../../assets/community-comment.svg';
import community_empty_heart from '../../assets/community-empty_heart.svg';
import community_filed_heart from '../../assets/community-filed_heart.svg';
import diary_left from '../../assets/diary-left.svg';
import diary_right from '../../assets/diary-right.svg';
import diary_info from '../../assets/diary-info.svg';
import home_calender from '../../assets/home-calendar.svg';
import home_history from '../../assets/home-history.svg';
import home_pen from '../../assets/home-pen.svg';
import nav_community from '../../assets/nav-community.svg';
import nav_home from '../../assets/nav-home.svg';
import nav_log from '../../assets/nav-log.svg';
import nav_profile from '../../assets/nav-profile.svg';
import nav_write from '../../assets/nav-write.svg';
import write_submit from '../../assets/write-submit.svg';
import emoji_soso from '../../assets/Emoji-soso.svg';
import emoji_sad from '../../assets/Emoji-sad.svg';
import emoji_smail from '../../assets/Emoji-smail.svg';
import emoji_angry from '../../assets/Emoji-angry.svg';
import emoji_petulance from '../../assets/Emoji-petulance.svg';

interface IconProps {
  type:
    | 'nav_home'
    | 'nav_log'
    | 'nav_write'
    | 'nav_community'
    | 'nav_profile'
    | 'home_calender'
    | 'home_history'
    | 'home_pen'
    | 'diary_left'
    | 'diary_right'
    | 'diary_info'
    | 'write_submit'
    | 'close_x'
    | 'community_comment'
    | 'community_empty_heart'
    | 'community_filed_heart'
    | 'emoji_soso'
    | 'emoji_sad'
    | 'emoji_smail'
    | 'emoji_angry'
    | 'emoji_petulance';
  alt?: string;
  size?: number;
  [x: string]: unknown;
}

export const Icon = ({
  type,
  alt = '',
  size = 24,
  ...restProps
}: IconProps) => {
  let src = '';

  switch (type) {
    case 'nav_home':
      src = nav_home;
      break;
    case 'nav_log':
      src = nav_log;
      break;
    case 'nav_write':
      src = nav_write;
      break;
    case 'nav_community':
      src = nav_community;
      break;
    case 'nav_profile':
      src = nav_profile;
      break;
    case 'home_calender':
      src = home_calender;
      break;
    case 'home_history':
      src = home_history;
      break;
    case 'home_pen':
      src = home_pen;
      break;
    case 'diary_left':
      src = diary_left;
      break;
    case 'diary_right':
      src = diary_right;
      break;
    case 'diary_info':
      src = diary_info;
      break;
    case 'write_submit':
      src = write_submit;
      break;
    case 'community_empty_heart':
      src = community_empty_heart;
      break;
    case 'community_filed_heart':
      src = community_filed_heart;
      break;
    case 'community_comment':
      src = community_comment;
      break;
    case 'close_x':
      src = close_x;
      break;
    case 'emoji_soso':
      src = emoji_soso;
      break;
    case 'emoji_sad':
      src = emoji_sad;
      break;
    case 'emoji_smail':
      src = emoji_smail;
      break;
    case 'emoji_angry':
      src = emoji_angry;
      break;
    case 'emoji_petulance':
      src = emoji_petulance;
      break;
    default:
      throw new Error('지원하는 아이콘 타입이 존재하지 않습니다.');
  }

  return <StyledImg src={src} alt={alt} size={size} {...restProps} />;
};

const StyledImg = styled.img<{ size?: number }>`
  width: ${({ size }) => size || 24}px;
  height: ${({ size }) => size || 24}px;
`;
