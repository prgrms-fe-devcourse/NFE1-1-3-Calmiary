import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

const DiaryDetailEmojiAndDate = () => {
  return (
    <S_DiaryDetailEmojiAndDateWrapper>
      <div>
        <Icon type="emoji_smail" size={55} />
      </div>
      <p>24년 10월 22일의 고민</p>
    </S_DiaryDetailEmojiAndDateWrapper>
  );
};

export default DiaryDetailEmojiAndDate;

const S_DiaryDetailEmojiAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 11.33dvh;
  margin-bottom: 20px;
  font-size: 14px;
  position: relative;
`;
