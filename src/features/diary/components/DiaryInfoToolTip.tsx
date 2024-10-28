import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

function DiaryInfoToolTip() {
  return (
    <S_toolTipBtn>
      <Icon type="diary_info" alt="인포메이션 버튼" size={20} />
    </S_toolTipBtn>
  );
}

export default DiaryInfoToolTip;

const S_toolTipBtn = styled.button`
  all: unset;

  position: fixed;
  right: 30px;
  z-index: 999;
  top: 12.33dvh;
  background-color: ${({ theme }) => theme.colors.brand_bg};
`;
