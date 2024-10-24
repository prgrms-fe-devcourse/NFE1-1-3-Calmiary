import { useState } from 'react';
import styled from 'styled-components';
import ProfileButton from '../components/ProfileButton';
import ProfileModal from '../components/ProfileModal'; // 모달 컴포넌트 임포트

export default function ProfileUserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <span>안녕하세요, XXX님</span>
        </TextArea>
        <MainArea>
          <ImageArea></ImageArea>

          <InputArea>
            <input type="text" placeholder="닉네임" />
            <input type="text" placeholder="비밀번호" />
            <input type="text" placeholder="비밀번호 확인" />
            <ProfileButton width="308px" color="#A594F9">
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
  max-width: 390px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #181625;
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
  color: #ffffff;
`;

const ImageArea = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-top: 1rem;
`;

const InputArea = styled.div`
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
    background-color: #${({ theme }) => theme.colors.modal_purple300};
    color: #ffffff;
    padding: 1rem;
  }

  input::placeholder {
    color: #ffffff;
  }
`;
