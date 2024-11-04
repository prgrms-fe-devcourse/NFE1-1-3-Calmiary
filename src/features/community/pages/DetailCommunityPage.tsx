import styled from 'styled-components';
import { CommentsContent, WorryContent } from '../components';
import { Title } from '../components';

const DetailCommunityPage = () => {
  return (
    <Wrapper>
      <Title />
      <WorryContent />
      <CommentsContent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  min-height: 100vh;
  padding: 0 31px;
`;

export default DetailCommunityPage;
