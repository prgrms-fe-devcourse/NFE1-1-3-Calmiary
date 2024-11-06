import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { LoginFormPropTypes, LoginData } from '../types/homeTypes';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSubmit }: LoginFormPropTypes) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      userid: '',
      password: '',
    },
  });

  const onSubmitForm = (data: LoginData) => {
    onSubmit?.(data);
  };

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <LoginInput
          {...register('userid', {
            required: '아이디를 입력해주세요',
            minLength: {
              value: 4,
              message: '아이디는 최소 4자 이상이어야 합니다',
            },
          })}
          type="text"
          placeholder="아이디"
        />
        {errors.userid && <ErrorMessage>{errors.userid.message}</ErrorMessage>}

        <LoginInput
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            minLength: {
              value: 6,
              message: '비밀번호는 최소 6자 이상이어야 합니다',
            },
          })}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <LoginButton type="submit">로그인</LoginButton>
        <div style={{ textAlign: 'right' }}>
          <SignUpText onClick={() => navigate('/signup')}>회원가입</SignUpText>
        </div>
      </form>
    </LoginLayout>
  );
};

export default LoginForm;

const LoginLayout = styled.div`
  width: 100%;
  padding: 0 30px;
  position: relative;
  margin-top: 126px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  min-width: 430px;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.home_100};
  color: white;
  border: none;
  margin-bottom: 10px;
  font-size: 16px;

  &::placeholder {
    color: white;
  }

  &:focus {
    outline: none;
    background-color: #5a5a5a;
  }
  z-index: 1;

  flex-shrink: 0;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.brand_main};
  color: white;
  border: none;
  margin-bottom: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
  z-index: 1;
`;

const SignUpText = styled.span`
  right: 0;
  color: ${({ theme }) => theme.colors.brand_main};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 12px;
  margin: 5px 0 10px 0;
`;
