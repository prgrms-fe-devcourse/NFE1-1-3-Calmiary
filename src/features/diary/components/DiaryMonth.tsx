import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { DiaryMonthPropTypes } from '../types/diaryTypes';

function DiaryMonth({ currentMonth, onMonthChange }: DiaryMonthPropTypes) {
  const handlePrevMonth = () => {
    onMonthChange(currentMonth === 1 ? 12 : currentMonth - 1);
  };

  const handleNextMonth = () => {
    onMonthChange(currentMonth === 12 ? 1 : currentMonth + 1);
  };

  return (
    <MonthWrapper>
      <MonthButton onClick={handlePrevMonth}>
        <Icon type="diary_left" size={24} />
      </MonthButton>
      <MonthText>{currentMonth}월</MonthText>
      <MonthButton onClick={handleNextMonth}>
        <Icon type="diary_right" size={24} />
      </MonthButton>
    </MonthWrapper>
  );
}

export default DiaryMonth;

const MonthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const MonthButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.write_white200};
`;

const MonthText = styled.span`
  font-size: 18px;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
`;
