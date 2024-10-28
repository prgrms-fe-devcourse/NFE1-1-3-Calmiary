import styled from 'styled-components';
import { UserInfo } from '../../community/components';
import communityFiledHeart from '../../../assets/community-filed_heart.svg';
import { mockPosts } from '../../../features/community/components/mockData';

const DetailPostContent = () => {
  return (
    <Wrapper>
      <UserInfo />
      <Content>{mockPosts[0].content}</Content>
      <EmpathyLayout>
        <img src={communityFiledHeart} alt="filledHeart" />
        <p>{mockPosts[0].likes}</p>
      </EmpathyLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 26px;
  border-radius: 15px;
  background-color: rgb(147, 143, 164, 0.4);
  width: 100%;
`;

const Content = styled.div`
  line-height: 22px;
  color: #ffffff;
`;

const EmpathyLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    color: #ffffff;
  }
`;

export default DetailPostContent;
