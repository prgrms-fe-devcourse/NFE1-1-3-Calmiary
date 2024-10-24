// interface DiaryFilterProps {

import styled from 'styled-components';

// }

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

const S_DiaryFilter = styled.div``;
