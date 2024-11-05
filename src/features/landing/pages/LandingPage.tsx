import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Logo from '../../../assets/home-logo.svg';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const infoItems = [
    '당신의 감정을 기록하세요',
    'AI가 당신의 이야기를 들어줄 거예요',
    '하루하루 성장하는 나를 만나보세요',
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSwipe = (_event: any, info: any) => {
    const progress = Math.max(-1, Math.min(1, info.offset.x / 200));
    setMousePosition({
      x: progress * 30,
      y: 0,
    });
  };

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -50) {
      setShowInfo(true);
    } else if (info.offset.x > 50) {
      setShowInfo(false);
    }
    setMousePosition({ x: 0, y: 0 });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Wrapper>
      <BackgroundContainer
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      >
        <BlobLeft
          animate={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
            opacity: showInfo ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
        <BlobRight
          animate={{
            x: mousePosition.x * 1.5,
            y: mousePosition.y * 1.5,
            opacity: showInfo ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
      </BackgroundContainer>

      <AnimatePresence mode="wait">
        {!showInfo ? (
          <MainContent
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            drag="x"
            dragElastic={0.7}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={handleSwipe}
            onDragEnd={handleDragEnd}
          >
            <LogoContainer>
              <Title>나를 기록하는 시간</Title>
              <motion.img
                src={Logo}
                alt="Calmiary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </LogoContainer>
            <SwipeGuide>
              <SwipeIcon>←</SwipeIcon>
              <SwipeText>스와이프하여 더 알아보기</SwipeText>
            </SwipeGuide>
          </MainContent>
        ) : (
          <InfoContent
            key="info"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            drag="x"
            dragElastic={0.7}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={handleSwipe}
            onDragEnd={handleDragEnd}
          >
            <InfoTitle>Calmiary와 함께하는 고민 기록</InfoTitle>
            <InfoList>
              {infoItems.map((item, index) => (
                <InfoItem
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <Circle />
                  <Text>{item}</Text>
                </InfoItem>
              ))}
            </InfoList>
            <ButtonContainer>
              <LoginButton
                onClick={handleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                시작하기
              </LoginButton>
            </ButtonContainer>
            <SwipeGuide>
              <SwipeIcon>→</SwipeIcon>
              <SwipeText>스와이프하여 돌아가기</SwipeText>
            </SwipeGuide>
          </InfoContent>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  overflow: hidden;
  position: relative;
  touch-action: none;
`;

const MainContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  padding: 0 45px;
  font-size: 20px;
  gap: 20px;
`;

const InfoContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 32px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.brand_bg};
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 48px;
  text-align: center;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 300px;
`;

const Circle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.write_white200};
`;

const Title = styled.h1`
  font-size: 20px;
  opacity: 0.9;
`;

const Text = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

const SwipeGuide = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.write_white200};
`;

const SwipeIcon = styled.span`
  font-size: 24px;
  animation: bounce 1s infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-5px);
    }
  }
`;

const SwipeText = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  margin-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoginButton = styled(motion.button)`
  padding: 16px 48px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.diary_100},
    ${({ theme }) => theme.colors.diary_100}
  );
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const BackgroundContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Blob = styled(motion.div)`
  position: absolute;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.diary_100},
    ${({ theme }) => theme.colors.diary_100}
  );
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.6;
`;

const BlobLeft = styled(Blob)`
  width: 40vw;
  height: 40vw;
  top: -10%;
  left: -10%;
  animation: float 10s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(5%, 5%) rotate(5deg);
    }
  }
`;

const BlobRight = styled(Blob)`
  width: 35vw;
  height: 35vw;
  bottom: -10%;
  right: -10%;
  animation: floatReverse 12s ease-in-out infinite;

  @keyframes floatReverse {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(-5%, -5%) rotate(-5deg);
    }
  }
`;

export default LandingPage;
