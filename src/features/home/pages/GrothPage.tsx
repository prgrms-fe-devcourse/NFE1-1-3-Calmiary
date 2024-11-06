import styled from 'styled-components';
import { HomeBackLeft, HomeBackRight } from '../components/HomeLayout';
import BackRight from '../../../assets/home-back-right.svg';
import BackLeft from '../../../assets/home-back-left.svg';
import Growth from '../../../assets/growth.svg';
import { Icon } from '../../../components/ui/Icon';
import { useUser } from '../hooks/useUser';
import { useStats } from '../hooks/useStats';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const GrowthFactorPage = () => {
  const { getUserId } = useUser();
  const userId = getUserId().user_id;
  const { data: stats, isLoading } = useStats(userId);

  return (
    <GrowthWrapper>
      <GrowthLayout>
        <GrowthContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {!isLoading && stats && (
            <>
              <StepBox as={motion.div} variants={itemVariants}>
                <GrowthTitle>지금까지의 나는 어떤가요?</GrowthTitle>
                <motion.img
                  src={Growth}
                  alt="home temp"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  style={{ width: '88px', height: '88px' }}
                />
                <StepText>1단계</StepText>
              </StepBox>
              <FactorContainer
                as={motion.div}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <FactorBox as={motion.div}>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Icon type="home_pen" alt="pen" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <FactorCount>{stats?.this_week_posts}개</FactorCount>
                  </motion.div>
                  <FactorLabel>이번주 걱정</FactorLabel>
                </FactorBox>
                <Divider />
                <FactorBox as={motion.div}>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Icon type="home_calender" alt="calender" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <FactorCount>{stats?.total_posts}개</FactorCount>
                  </motion.div>
                  <FactorLabel>전체 걱정</FactorLabel>
                </FactorBox>
                <Divider />
                <FactorBox as={motion.div}>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Icon type="home_history" alt="history" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <FactorCount>{stats?.resolved_posts}개</FactorCount>
                  </motion.div>
                  <FactorLabel>딜어낸 걱정</FactorLabel>
                </FactorBox>
              </FactorContainer>
            </>
          )}
        </GrowthContainer>
      </GrowthLayout>

      <HomeBackRight
        as={motion.img}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={BackRight}
        alt="home backright"
      />
      <HomeBackLeft
        as={motion.img}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={BackLeft}
        alt="home backleft"
      />
    </GrowthWrapper>
  );
};

export default GrowthFactorPage;

const StepBox = styled.div`
  width: 100%;
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const GrowthWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.brand_bg};
`;

const GrowthLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 32px;
`;

const GrowthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

const GrowthTitle = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const StepText = styled.span`
  color: white;
  font-size: 20px;
`;

const FactorContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.home_100};
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
`;

const FactorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 16px;
`;

const FactorCount = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const FactorLabel = styled.span`
  color: white;
  font-size: 14px;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
`;
