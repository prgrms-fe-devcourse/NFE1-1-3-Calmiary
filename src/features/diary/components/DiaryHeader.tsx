import styled from 'styled-components';

function DiaryHeader() {
  return <S_DiaryHeader>다이어리</S_DiaryHeader>;
}

export default DiaryHeader;

const S_DiaryHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8.33dvh;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.write_white200};
  font-size: 20px;
`;
