// interface DiaryPageProps {}

import styled from 'styled-components';
import { DiaryHeader } from './components';
import DiaryMainPage from './pages/DiaryMainPage';

function DiaryPage() {
  return (
    <S_DiaryWrapper>
      <DiaryHeader />
      <DiaryMainPage />
      {/* <Outlet /> */}
    </S_DiaryWrapper>
  );
}

export default DiaryPage;

const S_DiaryWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  height: 100%;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;
