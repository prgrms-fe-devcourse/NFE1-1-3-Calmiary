import styled from 'styled-components';
import { DropDown, Post, Title } from './components';
import { useState } from 'react';

type SortKey = 'asc' | 'desc' | 'likes';

const CommunityPage = () => {
  const [isSorted, setIsSorted] = useState<SortKey>('desc');

  return (
    <Wrapper>
      <Title />
      <DropDownLayout>
        <DropDown isSorted={isSorted} setIsSorted={setIsSorted} />
      </DropDownLayout>
      <Post />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.brand_bg};
  min-height: 100vh;
  padding: 0 31px;
`;

const DropDownLayout = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export default CommunityPage;
