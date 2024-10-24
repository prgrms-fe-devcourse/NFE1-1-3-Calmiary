import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

function DiaryMonth() {
  return (
    <S_DiaryMonth>
      <S_Button>
        <S_IconLeft type="diary_left" />
      </S_Button>
      <p>10월</p>
      <S_Button>
        <S_IconRight type="diary_right" />
      </S_Button>
    </S_DiaryMonth>
  );
}

export default DiaryMonth;

const S_DiaryMonth = styled.div`
  width: 100%;
  height: 8.33vh;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 20px;
  }
`;

const S_Button = styled.button`
  background: none;
  border: none;
  /* padding: 0; */
  cursor: pointer;
`;

const S_IconLeft = styled(Icon)`
  margin-right: 20px;
`;

const S_IconRight = styled(Icon)`
  margin-left: 20px;
`;
