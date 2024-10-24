import styled from 'styled-components';

function DiaryFilter() {
  return (
    <S_DiaryFilter>
      <button>전체</button>
      <button>공개</button>
      <button>비공개</button>
    </S_DiaryFilter>
  );
}

export default DiaryFilter;

const S_DiaryFilter = styled.div`
  width: 100%;
  height: 8.33vh;
  display: flex;
  justify-content: space-around;
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.write_white200};

  button {
    color: white;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
`;
