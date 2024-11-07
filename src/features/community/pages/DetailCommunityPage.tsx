import styled from 'styled-components';
import { CommentsContent, WorryContent } from '../components';
import { Title } from '../components';
import { DetailPostTypes } from '../types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../network/axiosInstance';

const DetailCommunityPage = () => {
  const { id } = useParams();

  const getDetailPost = async (id: number): Promise<DetailPostTypes> => {
    const { data } = await axiosInstance.get<DetailPostTypes>(
      `/community/post/${id}`
    );

    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getDetailPost(Number(id)),
  });

  return (
    <Wrapper>
      <Title />
      <WorryContent
        userInfo={{
          nickname: data?.nickname || '',
          profile_image: data?.profile_image || '',
        }}
        content={data?.content}
        likesCount={data?.like_count}
        isLoading={isLoading}
      />
      <CommentsContent
        comment={data?.comments}
        postId={data?.id}
        refetchComments={refetch}
        isLoading={isLoading}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  min-height: 100vh;
  padding: 0 31px;
`;

export default DetailCommunityPage;
