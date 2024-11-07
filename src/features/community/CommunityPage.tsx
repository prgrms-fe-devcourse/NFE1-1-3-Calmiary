import styled from 'styled-components';
import { DropDown, Post, Title } from './components';
import { BeatLoader } from 'react-spinners';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SortKey, PostTypes } from './types';
import { axiosInstance } from '../../network/axiosInstance';

const CommunityPage = () => {
  const [isSorted, setIsSorted] = useState<SortKey>('latest');
  const [, setSearchParams] = useSearchParams();

  const SIZE = 10;

  const getPosts = async (
    sortedOption: string,
    page: number,
    SIZE: number
  ): Promise<PostTypes[]> => {
    const { data } = await axiosInstance.get(
      `/community/posts?sort_by=${sortedOption}&page=${page}&limit=${SIZE}`
    );

    return data;
  };

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', isSorted],
    queryFn: ({ pageParam = 1 }) => getPosts(isSorted, pageParam, SIZE),
    getNextPageParam: (lastPage, allPages) => {
      return Array.isArray(lastPage) && lastPage.length > 0
        ? allPages.length + 1
        : undefined;
    },
    initialPageParam: 1,
  });
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const handleSortChange = (option: SortKey) => {
    setIsSorted(option);
    setSearchParams({ sort_by: option }, { replace: true });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <Wrapper>
      <Title />
      <DropDownLayout>
        <DropDown isSorted={isSorted} setIsSorted={handleSortChange} />
      </DropDownLayout>
      {data?.pages.flatMap((page) =>
        page.map((post: PostTypes) => (
          <Post
            key={post.id}
            {...post}
            onClick={() => navigate(`/community/post/${post.id}`)}
          />
        ))
      )}
      {isFetchingNextPage && (
        <LoaderWrapper>
          <BeatLoader
            size={10}
            margin={4}
            color={'#ffffff'}
            loading={true}
            cssOverride={{ animationFillMode: 'forwards' }}
            speedMultiplier={0.6}
          />
        </LoaderWrapper>
      )}
      {isError && <p>Error: {error.message}</p>}
      <div ref={loadMoreRef} style={{ height: '1px' }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  min-height: 100vh;
  padding: 0 31px;
`;

const DropDownLayout = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default CommunityPage;
