import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import ProfileButton from '../components/ProfileButton';
import ProfileModal from '../components/ProfileModal';
import { useUser } from '../../home/hooks/useUser';
import { FormValuesPropTypes } from '../types/profileTypes';
import { useUserData } from '../hook/useUserData';
import { useUpdateProfile } from '../hook/useUpdateUserMutation';
import { useUpdateProfileImage } from '../hook/useUpdateImageMutation';

export default function ProfileUserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getUserId } = useUser();
  const userId = getUserId().user_id;
  const { data: userData, refetch: refetchUserData } = useUserData(userId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValuesPropTypes>({
    mode: 'onTouched',
  });

  const updateProfileMutation = useUpdateProfile({
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.');
      reset();
    },
    onError: (error) => {
      alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
      console.error('프로필 업데이트 오류:', error);
    },
  });

  const updateProfileImageMutation = useUpdateProfileImage(userId, {
    onSuccess: () => {
      alert('프로필 이미지가 수정되었습니다.');
      refetchUserData(); // 변경한 프로필 이미지로 데이터 갱신
    },
    onError: (error: Error) => {
      alert(`이미지 업로드 실패: ${error.message}`);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const onSubmit = async (data: FormValuesPropTypes) => {
    if (userId) {
      updateProfileMutation.mutate({
        userId,
        nickname: data.nickname,
        password: data.password,
      });
    }
  };

  const handleImageClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 검사 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setIsUploading(true);
    try {
      await updateProfileImageMutation.mutateAsync(file); // 파일 업로드
    } catch (error) {
      // 오류는 mutation의 onError에서 처리됩니다.
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
          <ImageArea onClick={handleImageClick}>
            {!imageLoaded && (
              <PlaceholderWrapper>
                <LoadImage />
              </PlaceholderWrapper>
            )}
            <ProfileImage
              src={userData?.profile_image}
              alt="프로필 이미지"
              onLoad={() => setImageLoaded(true)}
              $isLoaded={imageLoaded}
            />
            <ImageOverlay>
              <span>{isUploading ? '업로드 중...' : '이미지 변경'}</span>
            </ImageOverlay>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg, image/png, image/gif"
              onChange={handleImageChange}
              disabled={isUploading}
            />
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

            <ProfileButton
              type="submit"
              width="308px"
              color="#A594F9"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending
                ? '수정 중...'
                : '회원 정보 수정'}
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

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  span {
    color: white;
    font-size: 14px;
  }
`;

const ImageArea = styled.div`
  position: relative;
  width: 9.375rem;
  height: 9.375rem;
  margin-top: 1rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  &:hover {
    ${ImageOverlay} {
      opacity: 1;
    }
  }
  input {
    display: none;
  }
`;

const PlaceholderWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 50%;
`;

const LoadImage = styled.div`
  border-radius: 50%;
`;

const ProfileImage = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;
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
    color: red;
    font-size: 12px;
  }
`;
