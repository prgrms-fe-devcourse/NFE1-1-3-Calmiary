import styled from 'styled-components';
import { DiaryEmoji, DiaryFilter, DiaryMonth } from '../components';

function DiaryMainPage() {
  return (
    <S_DiaryMainPage>
      <DiaryFilter />
      <DiaryMonth />
      <DiaryEmoji />
    </S_DiaryMainPage>
  );
}

export default DiaryMainPage;

const S_DiaryMainPage = styled.section`
  width: 100%;
  overflow: hidden;
`;
