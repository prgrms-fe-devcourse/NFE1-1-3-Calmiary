import styled from 'styled-components';
import Logo from '../../../assets/home-logo.svg';
import Butterfly from '../../../assets/imgs/home-butterfly.png';

const HomeLogo = () => {
  return (
    <>
      <LogoContainer>
        <Text>나를 기록하는 시간</Text>
        <img src={Logo} alt="" />
      </LogoContainer>
      <HomeImageButterfly src={Butterfly} alt="home butterfly" />
    </>
  );
};

export default HomeLogo;

const LogoContainer = styled.div`
  margin-top: 173px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  padding: 0 45px;
  font-size: 20px;
  gap: 20px;
`;

const Text = styled.h1`
  color: white;
`;

const HomeImageButterfly = styled.img`
  position: absolute;
  top: 173px;
  left: 50%;
  transform: translateX(-50%);
`;
