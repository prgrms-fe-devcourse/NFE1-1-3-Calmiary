import styled from 'styled-components';
import { Title } from './components';

const CommunityPage = () => {
  return (
    <Wrapper>
      <Title />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  min-height: 100vh;
`;

export default CommunityPage;
