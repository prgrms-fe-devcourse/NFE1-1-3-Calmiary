import styled from 'styled-components';
import {
  DiaryCalminaryAnswer,
  DiaryDetailEmojiAndDate,
  DiaryInfoToolTip,
  DiaryMyWorry,
} from '../components';

function DiaryDetailPage() {
  return (
    <S_DiaryDetailPage>
      <DiaryInfoToolTip />
      <DiaryDetailEmojiAndDate />
      <DiaryMyWorry />
      <DiaryCalminaryAnswer />
    </S_DiaryDetailPage>
  );
}

export default DiaryDetailPage;

const S_DiaryDetailPage = styled.section`
  width: 100%;
  overflow: hidden;
  min-height: 75dvh;
`;
