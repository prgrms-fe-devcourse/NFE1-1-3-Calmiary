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
  min-height: 75vh;
`;

const S_EmojiGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const S_EmojiItem = styled.div`
  min-height: calc(75vh / 9);
  display: flex;
  justify-content: center;
  align-items: center;
`;
