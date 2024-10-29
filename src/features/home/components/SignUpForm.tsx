import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { SignUpData, SignUpFormProps } from '../types/homeTypes';

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData>({
    defaultValues: {
      userid: '',
      nickname: '',
      password: '',
      password_check: '',
    },
  });

  const password = watch('password');

  const onSubmitForm = (data: SignUpData) => {
    onSubmit?.(data);
  };

  return (
    <SignUpLayout>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <SignUpInput
          {...register('userid', {
            required: '아이디를 입력해주세요',
            minLength: {
              value: 4,
              message: '아이디는 최소 4자 이상이어야 합니다',
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: '영문과 숫자만 사용 가능합니다',
            },
          })}
          type="text"
          placeholder="아이디"
        />
        {errors.userid && <ErrorMessage>{errors.userid.message}</ErrorMessage>}

        <SignUpInput
          {...register('nickname', {
            required: '아이디를 입력해주세요',
            minLength: {
              value: 2,
              message: '닉네임은 최소 2자 이상이어야 합니다',
            },
          })}
          type="text"
          placeholder="닉네임"
        />
        {errors.nickname && (
          <ErrorMessage>{errors.nickname.message}</ErrorMessage>
        )}

        <SignUpInput
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다',
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
              message: '영문, 숫자, 특수문자를 포함해야 합니다',
            },
          })}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <SignUpInput
          {...register('password_check', {
            required: '비밀번호를 다시 입력해주세요',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다',
          })}
          type="password"
          placeholder="비밀번호 확인"
        />
        {errors.password_check && (
          <ErrorMessage>{errors.password_check.message}</ErrorMessage>
        )}

        <SignUpButton type="submit">회원가입</SignUpButton>
      </form>
    </SignUpLayout>
  );
};

export default SignUpForm;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 12px;
  margin: -5px 0 10px 5px;
`;

const SignUpLayout = styled.div`
  width: 100%;
  padding: 0 30px;
  position: relative;
  margin-top: 126px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const SignUpInput = styled.input`
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

const SignUpButton = styled.button`
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
