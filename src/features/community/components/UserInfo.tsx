import styled from 'styled-components';
import { mockPosts } from './mockData';

const UserInfo = () => {
  return (
    <Wrapper>
      <UserLayout>
        <img src={mockPosts[0].author.profileUrl} alt="userImg" />
        <p>{mockPosts[0].author.nickname}</p>
      </UserLayout>
      <p>{mockPosts[0].date}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #ffffff;
`;

const UserLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 44px;
    height: 44px;
    border-radius: 999px;
  }
`;

export default UserInfo;
