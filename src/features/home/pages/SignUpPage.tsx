import styled from 'styled-components';
import HomeLayout from '../components/HomeLayout';
import HomeLogo from '../components/HomeLogo';
import SignUpForm from '../components/SignUpForm';
import { SignUpData } from '../types/homeTypes';
import { useAuth } from '../hooks/useAuth';
import ErrorModal from '../../../components/ErrorModal';

const SignUpPage = () => {
  const { signUpMutation, errorModal, handleCloseModal } = useAuth();

  const handleSubmit = (signUpData: SignUpData) => {
    if (
      signUpData.userid &&
      signUpData.password &&
      signUpData.password_check &&
      signUpData.nickname
    ) {
      signUpMutation.mutate(signUpData);
    }
  };

  return (
    <SignUpWrapper>
      <HomeLayout>
        <HomeLogo />
        <SignUpForm
          onSubmit={handleSubmit}
          isLoading={signUpMutation.isPending}
        />
      </HomeLayout>
      <ErrorModal
        isOpen={errorModal.isOpen}
        message={errorModal.message}
        onClose={handleCloseModal}
        buttonText={signUpMutation.isSuccess ? '로그인하러 가기' : '확인'}
      />
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.brand_bg};
  gap: 3rem;
  position: relative;
`;

export default SignUpPage;
