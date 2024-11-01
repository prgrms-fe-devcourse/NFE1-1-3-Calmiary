import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { Post } from '../pages/DiaryMainPage';

type EmojiUnionType =
  | 'emoji_soso'
  | 'emoji_sad'
  | 'emoji_smail'
  | 'emoji_angry'
  | 'emoji_petulance';

interface DiaryEmojiProps {
  posts?: Post[];
}

const getEmojiType = (emotionType: string): EmojiUnionType => {
  const emojiMap: Record<string, EmojiUnionType> = {
    ANXIETY: 'emoji_sad',
    HAPPY: 'emoji_smail',
    ANGRY: 'emoji_angry',
    SOSO: 'emoji_soso',
    PETULANCE: 'emoji_petulance',
    // 기본값 설정
    DEFAULT: 'emoji_soso',
  };

  return emojiMap[emotionType] || emojiMap.DEFAULT;
};

function DiaryEmoji({ posts = [] }: DiaryEmojiProps) {
  return (
    <EmojiContainer>
      <EmojiGridWrapper>
        {posts.map((post) => (
          <EmojiItem key={post.id}>
            <Icon
              type={getEmojiType(post.emotion_type)}
              alt={post.emotion_type}
              size={55}
            />
          </EmojiItem>
        ))}
      </EmojiGridWrapper>
    </EmojiContainer>
  );
}

export default DiaryEmoji;

const EmojiContainer = styled.div`
  width: 100%;
  height: 66vh;
  padding: 0 30px 50px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const EmojiGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow: hidden;
`;

const EmojiItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
`;
