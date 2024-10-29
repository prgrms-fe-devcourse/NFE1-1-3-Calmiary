import styled from 'styled-components';
import { HomeBackLeft, HomeBackRight } from '../components/HomeLayout';
import BackRight from '../../../assets/home-back-right.svg';
import BackLeft from '../../../assets/home-back-left.svg';
import Growth from '../../../assets/growth.svg';
import { Icon } from '../../../components/ui/Icon';

const GrowthFactorPage = () => {
  return (
    <GrowthWrapper>
      <GrowthLayout>
        <GrowthContainer>
          <StepBox>
            <GrowthTitle>지금까지의 나는 어떤가요?</GrowthTitle>
            <TempImage src={Growth} alt="home temp" />
            <StepText>1단계</StepText>
          </StepBox>
          <FactorContainer>
            <FactorBox>
              <Icon type="home_pen" alt="pen" />
              <FactorCount>1개</FactorCount>
              <FactorLabel>이번주 걱정</FactorLabel>
            </FactorBox>
            <Divider />
            <FactorBox>
              <Icon type="home_calender" alt="calender" />
              <FactorCount>1개</FactorCount>
              <FactorLabel>전체 걱정</FactorLabel>
            </FactorBox>
            <Divider />
            <FactorBox>
              <Icon type="home_history" alt="history" />
              <FactorCount>1개</FactorCount>
              <FactorLabel>딜어낸 걱정</FactorLabel>
            </FactorBox>
          </FactorContainer>
        </GrowthContainer>
      </GrowthLayout>

      <HomeBackRight src={BackRight} alt="home backright" />
      <HomeBackLeft src={BackLeft} alt="home backleft" />
    </GrowthWrapper>
  );
};

export default GrowthFactorPage;

const TempImage = styled.img`
  width: 88px;
  height: 88px;
`;

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
