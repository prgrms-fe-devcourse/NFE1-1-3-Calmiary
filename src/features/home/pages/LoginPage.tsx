import styled from 'styled-components';
import HomeLayout from '../components/HomeLayout';
import HomeLogo from '../components/HomeLogo';
import LoginForm from '../components/LoginForm';
import { LoginData } from '../types/homeTypes';
import { useAuth } from '../hooks/useAuth';
import ErrorModal from '../../../components/ErrorModal';

const LoginPage = () => {
  const { loginMutation, errorModal, handleCloseModal } = useAuth();

  const handleSubmit = (loginData: LoginData) => {
    if (loginData.userid && loginData.password) {
      loginMutation.mutate(loginData);
    }
  };

  return (
    <LoginWrapper>
      <HomeLayout>
        <HomeLogo />
        <LoginForm onSubmit={handleSubmit} />
      </HomeLayout>
      <ErrorModal
        isOpen={errorModal.isOpen}
        message={errorModal.message}
        onClose={handleCloseModal}
        buttonText="확인"
      />
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  height: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.brand_bg};
  gap: 3rem;
  position: relative;
`;

export default LoginPage;
