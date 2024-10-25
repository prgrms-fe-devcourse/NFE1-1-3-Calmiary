import styled from 'styled-components';
import LikePost from '../components/LikePost';

export default function ProfileLikePage() {
  return (
    <>
      <ProfileContainer>
        <TextArea>좋아요 한 고민들</TextArea>
        <div className="dropdown">
          <select>
            <option value="최신순">최신순</option>
          </select>
        </div>
        <LikePost />
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  background-color: #181625;
  gap: 3rem;
  color: #fff;
  overflow: auto;

  .dropdown {
    display: flex;
    width: 100%;
    justify-content: end;
  }

  .dropdown select {
    margin-right: 2rem;
  }
`;

const TextArea = styled.div`
  padding-top: 3rem;
  color: #fff;
`;
