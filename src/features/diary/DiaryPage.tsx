// interface DiaryPageProps {}

import styled from 'styled-components';
import { DiaryHeader } from './components';
import DiaryDetailPage from './pages/DiaryDetailPage';
// import DiaryMainPage from './pages/DiaryMainPage';

function DiaryPage() {
  return (
    <S_DiaryWrapper>
      <DiaryHeader />
      <DiaryDetailPage />
      {/* <DiaryMainPage /> */}
      {/* <Outlet /> */}
    </S_DiaryWrapper>
  );
}

export default DiaryPage;

const S_DiaryWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  height: 100dvh;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.write_white200};
`;
