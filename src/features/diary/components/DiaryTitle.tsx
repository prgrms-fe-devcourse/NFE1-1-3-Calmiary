import styled from 'styled-components';
import DiaryInfoToolTip from './DiaryInfoToolTip';

interface DiaryTitlePropTypes {
  showInfo?: boolean;
}

const DiaryTitle = ({ showInfo = false }: DiaryTitlePropTypes) => {
  return (
    <Wrapper>
      <p>다이어리</p>
      {showInfo && <DiaryInfoToolTip />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  position: relative;

  p {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
`;

export default DiaryTitle;
