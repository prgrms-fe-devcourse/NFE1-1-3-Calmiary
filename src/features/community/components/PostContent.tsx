import styled from 'styled-components';
import { mockPosts } from './mockData';

const PostContent = () => {
  return (
    <Wrapper>
      <Content>{mockPosts[0].content}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 22px 0;
`;

const Content = styled.p`
  color: #ffffff;
  line-height: 22px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export default PostContent;
