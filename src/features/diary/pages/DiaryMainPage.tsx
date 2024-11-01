import styled from 'styled-components';
import { DiaryEmoji, DiaryFilter, DiaryMonth } from '../components';
import DiaryTitle from '../components/DiaryTitle';
import { useState } from 'react';
import { useUser } from '../../home/hooks/useUser';
import { axiosInstance } from '../../../network/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export type FilterType = '전체' | '공개' | '비공개';

export interface Post {
  id: number;
  user_id: number;
  emotion_type: string;
  content: string;
  ai_content: string;
  created_at: string;
  is_shared: boolean;
  is_solved: boolean;
}

interface GetPostsParams {
  user_id: number;
  year?: number;
  month?: number;
  is_shared?: boolean;
}

export const getPosts = async ({
  user_id,
  year,
  month,
  is_shared,
}: GetPostsParams) => {
  const { data } = await axiosInstance.get<Post[]>('/diary/posts', {
    params: {
      user_id,
      year,
      month,
      is_shared,
    },
  });
  return data;
};

function DiaryMainPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('전체');
  const { getUserId } = useUser();
  const userId = getUserId().user_id;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['diary', userId, currentYear, currentMonth, selectedFilter],
    queryFn: () =>
      getPosts({
        user_id: Number(userId),
        year: currentYear,
        month: currentMonth,
        is_shared:
          selectedFilter === '전체' ? undefined : selectedFilter === '공개',
      }),

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleFilterChange = (newFilter: FilterType) => {
    setSelectedFilter(newFilter);
  };

  return (
    <DiaryWrapper>
      <DiaryLayout>
        <DiaryTitle />
        <DiaryFilter
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
        <DiaryMonth />
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage>데이터를 불러오는데 실패했습니다.</ErrorMessage>
        ) : (
          <>
            <DiaryEmoji posts={posts} />
          </>
        )}
      </DiaryLayout>
    </DiaryWrapper>
  );
}

export default DiaryMainPage;

const LoadingSpinner = styled.div``;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 20px 0;
`;

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
