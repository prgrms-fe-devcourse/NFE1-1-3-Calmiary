import styled from 'styled-components';
import BackRight from '../../../assets/home-back-right.svg';
import BackLeft from '../../../assets/home-back-left.svg';

interface HomePropTypes {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomePropTypes) => {
  return (
    <HomeContainer>
      {children}
      <HomeBackRight src={BackRight} alt="home backright" />
      <HomeBackLeft src={BackLeft} alt="home backleft" />
    </HomeContainer>
  );
};

export default HomeLayout;

const HomeContainer = styled.div`
  height: 100vh;
  position: relative;
`;

export const HomeBackRight = styled.img`
  position: absolute;
  top: 72px;
  right: 0px;
  pointer-events: none;
`;

export const HomeBackLeft = styled.img`
  position: absolute;
  left: 0px;
  bottom: 15px;
  pointer-events: none;
`;
