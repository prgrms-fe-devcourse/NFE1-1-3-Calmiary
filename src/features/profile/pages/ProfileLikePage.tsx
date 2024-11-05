import styled from 'styled-components';
import Dropdown from '../components/Dropdown';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostPropTypes, SortOption } from '../types/profileTypes';
import ProfilePost from '../components/ProfilePost';
import { useUser } from '../../home/hooks/useUser';

const fetchLikedPosts = async ({
  pageParam = 1,
  sortOption,
  userId,
}: {
  pageParam?: number;
  sortOption: SortOption;
  userId: string;
}) => {
  const sortBy =
    sortOption === '최신순'
      ? 'latest'
      : sortOption === '좋아요순'
        ? 'likes'
        : 'comments';
  const response = await axios.get(
    `/api/profile/posts/liked/${userId}?sort_by=${sortBy}&page=${pageParam}&limit=3`
  );
  return {
    data: response.data,
    nextPage: response.data.length === 3 ? pageParam + 1 : undefined,
  };
};

export default function ProfileLikePage() {
  const { getUserId } = useUser();
  const { user_id } = getUserId();

  const [sortOption, setSortOption] = useState<
    '최신순' | '좋아요순' | '오래된순'
  >('최신순');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['likedPosts', sortOption, user_id],
      queryFn: ({ pageParam = 1 }) =>
        fetchLikedPosts({ pageParam, sortOption, userId: user_id }),
      getNextPageParam: (lastPage) => lastPage?.nextPage,
      initialPageParam: 1,
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const hasNoPosts =
    !isLoading && (!data?.pages[0]?.data || data.pages[0].data.length === 0);

  return (
    <>
      <ProfileContainer>
        <TextArea>좋아요 한 고민들</TextArea>
        <DropdownArea>
          <Dropdown
            category={sortOption}
            data={['최신순', '좋아요순', '오래된순']}
            setState={
              setSortOption as React.Dispatch<React.SetStateAction<string>>
            }
            isOpen={isDropdownOpen}
            setSelectedDropDown={toggleDropdown}
          />
        </DropdownArea>
        {isLoading && <p>Loading...</p>}
        {hasNoPosts && (
          <NoPostArea>
            <p>공감한 포스터가 없습니다.</p>
          </NoPostArea>
        )}
        {data?.pages.map((page) =>
          page.data.map((post: PostPropTypes) => (
            <ProfilePost
              key={post.id}
              id={post.id}
              content={post.content}
              likes={post.like_count}
              createdAt={post.created_at}
              nickname={post.user_info.nickname}
              profileImg={post.user_info.profile_image}
              comments={post.comment_count}
            />
          ))
        )}
        <div ref={loadMoreRef}>
          {isFetchingNextPage && <p>Loading more...</p>}
        </div>
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  gap: 3rem;
  color: ${({ theme }) => theme.colors.write_white200};
  overflow: auto;
`;

const DropdownArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  padding-right: 1.5rem;
`;

const TextArea = styled.div`
  padding-top: 3rem;
  color: ${({ theme }) => theme.colors.write_white200};
`;

const NoPostArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
