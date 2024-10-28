import styled from 'styled-components';
import BackRight from '../../../assets/home-back-right.svg';
import BackLeft from '../../../assets/home-back-left.svg';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 390px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.brand_bg};
  gap: 3rem;
  position: relative;
`;

const HomeBackRight = styled.img`
  position: absolute;
  top: 72px;
  right: 0px;
`;

const HomeBackLeft = styled.img`
  position: absolute;
  left: 0px;
  bottom: 15px;
`;
