import styled from 'styled-components';
import { DiaryEmoji, DiaryFilter, DiaryMonth } from '../components';
import DiaryTitle from '../components/DiaryTitle';
import { useState } from 'react';

export type FilterType = '전체' | '공개' | '비공개';

function DiaryMainPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('전체');

  return (
    <DiaryWrapper>
      <DiaryLayout>
        <DiaryTitle />
        <DiaryFilter
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        <DiaryMonth />
        <DiaryEmoji />
      </DiaryLayout>
    </DiaryWrapper>
  );
}

export default DiaryMainPage;

const DiaryWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  height: 100dvh;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.write_white200};
`;

const DiaryLayout = styled.section`
  width: 100%;
  overflow: hidden;
`;
