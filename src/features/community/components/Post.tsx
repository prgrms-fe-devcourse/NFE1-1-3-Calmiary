import styled from 'styled-components';
import { mockPosts } from './mockData';
import communityComment from '../../../assets/community-comment.svg';
import communityFiledHeart from '../../../assets/community-filed_heart.svg';

const Post = () => {
  return (
    <Wrapper>
      <InfoLayout>
        <UserContinaer>
          <img src={mockPosts[0].author.profileUrl} alt="userImg" />
          <p>{mockPosts[0].author.nickname}</p>
        </UserContinaer>
        <p>{mockPosts[0].date}</p>
      </InfoLayout>
      <ContentLayout>
        <Content>{mockPosts[0].content}</Content>
      </ContentLayout>
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
  width: 100%;
  height: 243px;
  border-radius: 15px;
  background-color: rgba(231, 225, 255, 0.4);
  margin-bottom: 36px;
  padding: 26px;
`;

const InfoLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #ffffff;
`;

const UserContinaer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 44px;
    height: 44px;
    border-radius: 999px;
  }
`;

const ContentLayout = styled.div`
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
