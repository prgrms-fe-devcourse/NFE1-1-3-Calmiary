import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

type EmojiUnionType =
  | 'emoji_soso'
  | 'emoji_sad'
  | 'emoji_smail'
  | 'emoji_angry'
  | 'emoji_petulance';

const EmojiArrMockData: EmojiUnionType[] = [
  'emoji_soso',
  'emoji_sad',
  'emoji_smail',
  'emoji_angry',
  'emoji_petulance',
  'emoji_soso',
  'emoji_sad',
  'emoji_smail',
  'emoji_angry',
  'emoji_petulance',
  'emoji_soso',
  'emoji_sad',
  'emoji_smail',
  'emoji_angry',
  'emoji_petulance',
  'emoji_soso',
  'emoji_sad',
  'emoji_smail',
  'emoji_angry',
  'emoji_petulance',
  'emoji_soso',
  'emoji_sad',
  'emoji_smail',
  'emoji_angry',
  'emoji_petulance',
  'emoji_soso',
  'emoji_sad',
  'emoji_smail',
  'emoji_angry',
  'emoji_petulance',
];

function DiaryEmoji() {
  return (
    <S_EmojiContainer>
      <S_EmojiGridWrapper>
        {EmojiArrMockData.map((emojiType: EmojiUnionType) => (
          <S_EmojiItem key={emojiType}>
            <Icon type={emojiType} alt={emojiType} size={55} />
          </S_EmojiItem>
        ))}
      </S_EmojiGridWrapper>
    </S_EmojiContainer>
  );
}

export default DiaryEmoji;

const S_EmojiContainer = styled.div`
  width: 100%;
  height: 66.7dvh; // 피그마 grid 기준 8/12 표현
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const S_EmojiGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const S_EmojiItem = styled.div`
  height: calc(
    (100vh - 8.33dvh) / 8
  ); // 마찬가지로 피그마 grid 기준 8/12 로 하되 각 그리드 X row 8.33dvh 마이너스
  display: flex;
  justify-content: center;
  align-items: center;
`;
