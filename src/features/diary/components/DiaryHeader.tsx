import styled from 'styled-components';

function DiaryHeader() {
  return <S_DiaryHeader>다이어리</S_DiaryHeader>;
}

export default DiaryHeader;

const S_DiaryHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 0px;
  color: white;
  margin-bottom: 50px;
`;
