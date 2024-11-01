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
    <EmojiContainer>
      <EmojiGridWrapper>
        {EmojiArrMockData.map((emojiType: EmojiUnionType) => (
          <EmojiItem>
            <Icon type={emojiType} alt={emojiType} size={55} />
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
