import styled from 'styled-components';
import { CommentsContent, WorryContent } from '../components';
import { Title } from '../components';
import axios from 'axios';
import { DetailPostTypes } from '../types';

const DetailCommunityPage = () => {
  const getDetailPost = async (id: number): Promise<DetailPostTypes[]> => {
    const { data } = await axios.get(`/api/community/post/${id}`);
    console.log(data);
    return data;
  };
  return (
    <Wrapper>
      <Title />
      <WorryContent />
      <CommentsContent />
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
