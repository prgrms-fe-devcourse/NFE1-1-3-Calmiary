import styled from 'styled-components';
import { mockPosts } from './mockData';
import { Icon } from '../../../components/ui/Icon';

const PostReaction = () => {
  return (
    <Wrapper>
      <EmpathyLayout>
        <Icon type="community_filed_heart" alt="filledHeart" />
        <p>{mockPosts[0].likes}</p>
      </EmpathyLayout>
      <CommentLayout>
        <Icon type="community_comment" alt="comment" />
        <p>{mockPosts[0].comments}</p>
      </CommentLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
  }
`;

const EmpathyLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CommentLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default PostReaction;
