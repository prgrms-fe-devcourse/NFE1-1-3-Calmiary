import styled from 'styled-components';
import ProfileButton from '../components/ProfileButton';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../home/hooks/useUser';
import { useUserData } from '../hook/useUserData';
import axios from 'axios';

export default function ProfileMainPage() {
  const { getUserId, logout, getAccessToken } = useUser();
  const navigate = useNavigate();
  const userId = getUserId().user_id;

  const { data: userData } = useUserData(userId);

  const handleLogout = async () => {
    try {
      const token = getAccessToken();

      await axios.post(
        '/api/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      logout(); // 쿠키 제거
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <ProfileContainer>
        <TextArea>
          <span>안녕하세요, {userData?.nickname}님</span>
        </TextArea>
        <MainArea>
          <ImageArea>
            <img src={userData?.profile_image} alt="프로필 이미지" />
          </ImageArea>

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

          <ProfileButton color="#A594F9" onClick={handleLogout}>
            로그아웃
          </ProfileButton>
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
  margin-top: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 7rem;
`;
