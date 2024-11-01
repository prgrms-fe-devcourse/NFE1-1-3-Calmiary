import styled from 'styled-components';
import {
  DiaryCalminaryAnswer,
  DiaryDetailEmojiAndDate,
  DiaryMyWorry,
} from '../components';
import { useParams } from 'react-router-dom';
import DiaryTitle from '../components/DiaryTitle';

function DiaryDetailPage() {
  const { id } = useParams();

  console.log(id);

  return (
    <DiaryDetailWrapper>
      <DiaryTitle showInfo={true} />
      <DiaryDetailEmojiAndDate />
      <DiaryMyWorry />
      <DiaryCalminaryAnswer />
    </DiaryDetailWrapper>
  );
}

export default DiaryDetailPage;

const DiaryDetailWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  height: 100dvh;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  gap: 30px;
  align-items: center;
  color: ${({ theme }) => theme.colors.write_white200};
`;
