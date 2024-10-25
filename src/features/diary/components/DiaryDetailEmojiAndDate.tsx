import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

function DiaryDetailEmojiAndDate() {
  return (
    <S_DiaryDetailEmojiAndDateWrapper>
      <Icon type="emoji_smail" size={55} />
      <p>24년 10월 22일의 고민</p>
    </S_DiaryDetailEmojiAndDateWrapper>
  );
}

export default DiaryDetailEmojiAndDate;

const S_DiaryDetailEmojiAndDateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 8.33dvh;
  margin-bottom: 20px;
  font-size: 14px;

  p {
    margin-top: 18px;
  }
`;
