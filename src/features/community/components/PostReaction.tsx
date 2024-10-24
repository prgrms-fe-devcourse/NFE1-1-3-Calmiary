import styled from 'styled-components';
import { mockPosts } from './mockData';
import communityComment from '../../../assets/community-comment.svg';
import communityFiledHeart from '../../../assets/community-filed_heart.svg';

const PostReaction = () => {
  return (
    <Wrapper>
      <EmpathyLayout>
        <img src={communityFiledHeart} alt="filledHeart" />
        <p>{mockPosts[0].likes}</p>
      </EmpathyLayout>
      <CommentLayout>
        <img src={communityComment} alt="comment" />
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
