import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { useState } from 'react';
import Tooltip from '../../../assets/info.svg';

function DiaryInfoToolTip() {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <TooltipWrapper>
      <InfoIconWrapper onClick={() => setShowTooltip(!showTooltip)}>
        <Icon type="diary_info" alt="인포메이션 버튼" size={20} />
      </InfoIconWrapper>
      {showTooltip && <TooltipContent src={Tooltip} alt="" />}
    </TooltipWrapper>
  );
}

const TooltipWrapper = styled.div`
  position: relative;
  margin-left: 8px;
`;

const InfoIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: -20px;
  bottom: 50%;
  transform: translateY(50%);
`;

const TooltipContent = styled.img`
  position: absolute;
  border-radius: 8px;
  font-size: 12px;
  color: black;
  top: 40%;
  left: 30%;
  transform: translate(-40%, 30%);
  white-space: nowrap;
  z-index: 1;
`;

export default DiaryInfoToolTip;
