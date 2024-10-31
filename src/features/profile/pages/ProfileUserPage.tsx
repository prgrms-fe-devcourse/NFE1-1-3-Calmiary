import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import ProfileButton from '../components/ProfileButton';
import ProfileModal from '../components/ProfileModal';
import { useUser } from '../../home/hooks/useUser';
import axios from 'axios';
import { FormValuesPropTypes } from '../types/profileTypes';
import { useUserData } from '../hook/useUserData';

export default function ProfileUserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getUserId } = useUser();
  const userId = getUserId().user_id;

  const { data: userData } = useUserData(userId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValuesPropTypes>({
    mode: 'onTouched', // 필드가 포커스를 잃을 때 유효성 검사를 실행합니다.
  });

  const onSubmit = async (data: FormValuesPropTypes) => {
    if (userId) {
      try {
        await axios.patch(`/api/profile/update/${userId}`, {
          nickname: data.nickname,
          password: data.password,
        });
        alert('회원 정보가 수정되었습니다.');
        reset();
      } catch (error) {
        alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ProfileContainer>
        <TextArea>
          <span>안녕하세요, {userData?.nickname}님</span>
        </TextArea>
        <MainArea>
          <ImageArea>
            <img src={userData?.profile_image} alt="프로필이미지" />
          </ImageArea>

          <InputArea onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              defaultValue={userData?.nickname}
              placeholder="닉네임"
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: '닉네임은 최소 2글자 이상이어야 합니다.',
                },
              })}
            />
            {errors.nickname && <span>{errors.nickname.message}</span>}

            <input
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8글자 이상이어야 합니다.',
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <input
              type="password"
              placeholder="비밀번호 확인"
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) =>
                  value === watch('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordConfirm && (
              <span>{errors.passwordConfirm.message}</span>
            )}

            <ProfileButton type="submit" width="308px" color="#A594F9">
              회원 정보 수정
            </ProfileButton>
          </InputArea>
          <button className="resignBtn" onClick={openModal}>
            회원탈퇴
          </button>
        </MainArea>
      </ProfileContainer>

      {isModalOpen && <ProfileModal onClose={closeModal} />}
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #6b677d;
  width: 328px;
  height: 744px;
  border-radius: 1rem;

  .resignBtn {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    background-color: inherit;
    border: none;
    color: #8c8c91;
    cursor: pointer;
  }
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
    border-radius: 50%;
    object-fit: cover;
  }
`;

const InputArea = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 7rem;

  input {
    width: 308px;
    height: 57px;
    border-radius: 1rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.modal_purple300};
    color: ${({ theme }) => theme.colors.write_white200};
    padding: 1rem;
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.write_white200};
  }

  span {
    color: ${({ theme }) => theme.colors.write_white200};
    font-size: 12px;
  }
`;
