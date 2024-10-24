import styled from 'styled-components';
import { Post, Title } from './components';

const CommunityPage = () => {
  return (
    <Wrapper>
      <Title />
      <Post />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  min-height: 100vh;
  padding: 0 31px;
`;

export default CommunityPage;
