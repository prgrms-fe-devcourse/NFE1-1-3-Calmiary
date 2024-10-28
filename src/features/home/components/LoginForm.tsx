import styled from 'styled-components';
import { FormEvent, useState } from 'react';
import { LoginFormProps, LoginData } from '../types/loginTypes';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(loginData);
  };

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit}>
        <LoginInput
          type="text"
          name="username"
          placeholder="아이디"
          value={loginData.username}
          onChange={handleChange}
        />
        <LoginInput
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginData.password}
          onChange={handleChange}
        />
        <LoginButton type="submit">로그인</LoginButton>
        <div style={{ textAlign: 'right' }}>
          <SignUpText>회원가입</SignUpText>
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
