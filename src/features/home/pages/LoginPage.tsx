import styled from 'styled-components';
import HomeLayout from '../components/HomeLayout';
import HomeLogo from '../components/HomeLogo';
import LoginForm from '../components/LoginForm';
import { LoginData } from '../types/homeTypes';

const LoginPage: React.FC = () => {
  const handleSubmit = (loginData: LoginData) => {
    if (loginData.userid && loginData.password) {
      //Query 들어갈 부분
    }
  };

  return (
    <LoginWrapper>
      <HomeLayout>
        <HomeLogo />
        <LoginForm onSubmit={handleSubmit} />
      </HomeLayout>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 390px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.brand_bg};
  gap: 3rem;
  position: relative;
`;

export default LoginPage;
