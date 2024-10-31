import styled from 'styled-components';
import { CommentsContent, UserInfo, WorryContent } from '../components';
import { Title } from '../components';
import axios from 'axios';
import { DetailPostTypes } from '../types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const DetailCommunityPage = () => {
  const { id } = useParams();

  const getDetailPost = async (id: number): Promise<DetailPostTypes> => {
    const { data } = await axios.get<DetailPostTypes>(
      `/api/community/post/${id}`
    );

    return data;
  };

  const { data, refetch } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getDetailPost(Number(id)),
  });
  console.log(data);

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
        userId={data?.user_id}
      />
      <CommentsContent
        comment={data?.comments}
        postId={data?.id}
        userId={Number(data?.user_id)}
        refetchComments={refetch}
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
