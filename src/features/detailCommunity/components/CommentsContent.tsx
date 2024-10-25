import styled from 'styled-components';
import { mockPosts } from '../../../features/community/components/mockData';
import { Comments, CommentInput } from './index';

const CommentsContent = () => {
  return (
    <Wrapper>
      <h2>댓글</h2>
      {mockPosts[0].comment && <Comments />}
      <CommentInput />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin-left: 4px;
  }
`;

export default CommentsContent;
