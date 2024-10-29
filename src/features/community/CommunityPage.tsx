import styled from 'styled-components';
import { DropDown, Post, Title } from './components';
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

type SortKey = 'latest' | 'asc' | 'likes';

export interface UserDataType {
  nickname: string;
  profile_image: string;
}
export interface PostTypes {
  id: string;
  user_id: string;
  emotion_type: string;
  content: string;
  ai_content: string;
  created_at: Date;
  is_shared: boolean;
  is_solved: boolean;
  like_count: number;
  comment_count: number;
  user_info: UserDataType;
}

const CommunityPage = () => {
  const [isSorted, setIsSorted] = useState<SortKey>('latest');
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = (searchParams.get('sort_by') as SortKey) || 'latest';
  const SIZE = 10;

  const getPosts = async (
    sortedOption: string,
    page: number,
    SIZE: number
  ): Promise<PostTypes[]> => {
    const { data } = await axios.get(
      `/api/community/posts?sort_by=${sortedOption}&page=${page}&limit=${SIZE}`
    );

    return data;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', isSorted],
    queryFn: () => getPosts(isSorted, 1, SIZE),
  });

  const handleSortChange = (option: SortKey) => {
    setIsSorted(option);
    setSearchParams({ sort_by: option }, { replace: true });
  };

  return (
    <Wrapper>
      <Title />
      <DropDownLayout>
        <DropDown isSorted={isSorted} setIsSorted={handleSortChange} />
      </DropDownLayout>
      {data?.map((post) => <Post key={post.id} {...post} />)}
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

export default CommunityPage;
