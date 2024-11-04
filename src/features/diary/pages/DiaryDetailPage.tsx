import styled from 'styled-components';
import {
  DiaryCalminaryAnswer,
  DiaryDetailEmojiAndDate,
  DiaryMyWorry,
} from '../components';
import DiaryTitle from '../components/DiaryTitle';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../network/axiosInstance';
import { Post } from './DiaryMainPage';
import { useParams } from 'react-router-dom';

export const getPostDetail = async (postId: number) => {
  const { data } = await axiosInstance.get<Post>(`/diary/post/${postId}`);
  return data;
};

function DiaryDetailPage() {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['diary', 'detail', id],
    queryFn: () => getPostDetail(Number(id)),
    enabled: !!id,
  });

  return (
    <DiaryDetailWrapper>
      <FixedHeader>
        <DiaryTitle showInfo={true} />
        {!isLoading && post && (
          <DiaryDetailEmojiAndDate
            id={post.id}
            isSolved={post.is_solved}
            emotionType={post.emotion_type}
            createdAt={post.created_at}
          />
        )}
      </FixedHeader>

      <ScrollContent>
        {!isLoading && post && (
          <>
            <DiaryMyWorry
              id={post.id}
              content={post.content}
              isShared={post.is_shared}
              isSolved={post.is_solved}
            />
            <DiaryCalminaryAnswer aiContent={post.ai_content} />
          </>
        )}
      </ScrollContent>
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
  color: ${({ theme }) => theme.colors.write_white200};
  position: relative;
`;

const FixedHeader = styled.div`
  flex-shrink: 0;
  position: sticky;
  top: 60px;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  padding-bottom: 20px;
`;

const ScrollContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-right: 8px;
  margin-top: 20px;

  // 스크롤바 스타일링
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.diary_100};
    border-radius: 4px;
  }
`;
