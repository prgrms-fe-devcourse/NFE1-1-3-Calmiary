import styled from 'styled-components';
import { mockPosts } from './mockData';
import communityComment from '../../../assets/community-comment.svg';
import communityFiledHeart from '../../../assets/community-filed_heart.svg';
import { Content, UserInfo } from '../components';

const Post = () => {
  return (
    <Wrapper>
      <UserInfo />
      <Content />
      <ReactionLayout>
        <EmpathyContainer>
          <img src={communityFiledHeart} alt="filledHeart" />
          <p>{mockPosts[0].likes}</p>
        </EmpathyContainer>
        <CommentContainer>
          <img src={communityComment} alt="comment" />
          <p>{mockPosts[0].comments}</p>
        </CommentContainer>
      </ReactionLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 243px;
  border-radius: 15px;
  background-color: rgba(231, 225, 255, 0.4);
  margin-bottom: 36px;
  padding: 20px 26px;
`;

const ReactionLayout = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
  }
`;

const EmpathyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default Post;
