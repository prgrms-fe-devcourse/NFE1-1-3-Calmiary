import styled from 'styled-components';
import ProfileButton from '../components/ProfileButton';
import { Link } from 'react-router-dom';

export default function ProfileMainPage() {
  return (
    <>
      <ProfileContainer>
        <TextArea>
          <span>안녕하세요, XXX님</span>
        </TextArea>
        <MainArea>
          <ImageArea></ImageArea>

          <ButtonArea>
            <Link to="/userProfile">
              <ProfileButton>회원 정보 관리</ProfileButton>
            </Link>
            <Link to="/sharePost">
              <ProfileButton>공유한 고민</ProfileButton>
            </Link>
            <Link to="/likePost">
              <ProfileButton>좋아요 한 고민</ProfileButton>
            </Link>
          </ButtonArea>

          <ProfileButton color="#A594F9">로그아웃</ProfileButton>
        </MainArea>
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 430px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  gap: 3rem;
`;

const MainArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #6b677d;
  width: 328px;
  height: 744px;
  border-radius: 1rem;
`;

const TextArea = styled.div`
  color: ${({ theme }) => theme.colors.write_white200};
`;

const ImageArea = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-top: 1rem;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 7rem;
`;
