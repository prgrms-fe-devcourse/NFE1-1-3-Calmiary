import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { getEmojiType } from './DiaryEmoji';

interface DiaryDetailEmojiAndDatePropTypes {
  emotionType: string;
  createdAt: string;
}

const DiaryDetailEmojiAndDate = ({
  emotionType,
  createdAt,
}: DiaryDetailEmojiAndDatePropTypes) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
  });

  return (
    <DiaryDetailEmojiAndDateWrapper>
      <div>
        <Icon type={getEmojiType(emotionType)} size={55} />
      </div>
      <p>{formattedDate}의 고민</p>
    </DiaryDetailEmojiAndDateWrapper>
  );
};

export default DiaryDetailEmojiAndDate;

const DiaryDetailEmojiAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 11.33dvh;
  margin-bottom: 20px;
  font-size: 14px;
  position: relative;
`;
