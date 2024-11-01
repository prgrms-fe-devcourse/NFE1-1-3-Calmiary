import styled from 'styled-components';
import Switch from './Switch';
import { useState } from 'react';

const DiaryMyWorry = () => {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <WorryWrapper>
      <WorryHeader>
        <p>나의 고민</p>
        <SwitchWrapper>
          <span>{isPublic ? '공개' : '비공개'}</span>
          <Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
        </SwitchWrapper>
      </WorryHeader>
      <WorryContent>
        요즘말야~ 참 고민이 많아~ 어떻게 해야 할지 모르겠나봐~~ 흠흠~
      </WorryContent>
    </WorryWrapper>
  );
};

const WorryWrapper = styled.div`
  width: 100%;
`;

const WorryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  p {
    margin-left: 10px;
  }
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.write_white200};
  }
`;

const WorryContent = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  border: 3px solid ${({ theme }) => theme.colors.diary_100};
`;

export default DiaryMyWorry;
