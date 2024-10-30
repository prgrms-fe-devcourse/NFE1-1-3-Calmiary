import styled from 'styled-components';
import { CommentsContent, WorryContent } from '../components';
import { Title } from '../components';
import axios from 'axios';
import { DetailPostTypes } from '../types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const DetailCommunityPage = () => {
  const { id } = useParams();

  const getDetailPost = async (id: number): Promise<DetailPostTypes> => {
    const { data } = await axios.get(`/api/community/post/${id}`);

    return data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getDetailPost(Number(id)),
  });

  return (
    <Wrapper>
      <Title />
      <WorryContent content={data?.content} likesCount={data?.like_count} />
      <CommentsContent comment={data?.comments} />
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
