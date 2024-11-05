import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Solve from '../../../assets/solve.svg';
import { EmojiUnionType, DiaryEmojiPropTypes } from '../types/diaryTypes';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

export const getEmojiType = (emotionType: string): EmojiUnionType => {
  const emojiMap: Record<string, EmojiUnionType> = {
    soso: 'write_emotion_soso',
    cry: 'write_emotion_cry',
    smile: 'write_emotion_smile',
    scary: 'write_emotion_scary',
    angry: 'write_emotion_angry',
    // 기본값 설정
    DEFAULT: 'write_emotion_soso',
  };

  // 소문자로 변환하여 매핑
  const lowerEmotionType = emotionType.toLowerCase();
  return emojiMap[lowerEmotionType] || emojiMap.DEFAULT;
};

function DiaryEmoji({ posts = [] }: DiaryEmojiPropTypes) {
  const navigate = useNavigate();

  const handleEmojiClick = (postId: number) => {
    navigate(`/diary/${postId}`);
  };

  if (!posts.length) {
    return (
      <EmptyState
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon type="emoji_sad" size={80} />
        <EmptyText>아직 작성된 고민이 없어요</EmptyText>
      </EmptyState>
    );
  }

  return (
    <EmojiContainer>
      <AnimatePresence mode="wait">
        <EmojiGridWrapper
          key={posts.length}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {posts.map((post) => (
            <EmojiItem
              id={`emoji-${post.id}`}
              key={post.id}
              variants={itemVariants}
              onClick={() => handleEmojiClick(post.id)}
            >
              <Icon type={getEmojiType(post.emotion_type)} size={55} />
              {post.is_solved && <SolvedIcon src={Solve} />}
            </EmojiItem>
          ))}
        </EmojiGridWrapper>
      </AnimatePresence>
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

const EmojiGridWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow: hidden;
`;

const EmojiItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  position: relative;
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 66vh;
  gap: 16px;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.write_white200};
  font-size: 16px;
  opacity: 0.8;
`;

const SolvedIcon = styled.img`
  position: absolute;
  top: 5px;
  right: 5px;
`;
