import styled from 'styled-components';
import LikePost from '../components/LikePost';

export default function ProfileLikePage() {
  return (
    <>
      <ProfileContainer>
        <div>좋아요 한 고민들</div>
        <div>필터</div>
        <LikePost />
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 390px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #181625;
  gap: 3rem;
  color: #fff;
`;
