import styled from 'styled-components';
import { WorryContent } from '../detailCommunity/components';
import { Title } from '../../features/community/components';

const DetailCommunityPage = () => {
  return (
    <Wrapper>
      <Title />
      <WorryContent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  min-height: 100vh;
  padding: 0 31px;
`;

export default DetailCommunityPage;
