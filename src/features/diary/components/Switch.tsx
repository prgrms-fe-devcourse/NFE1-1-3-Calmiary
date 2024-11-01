import styled from 'styled-components';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <SwitchWrapper checked={checked} onClick={onChange}>
      <SwitchButton checked={checked} />
    </SwitchWrapper>
  );
};

const SwitchWrapper = styled.div<{ checked: boolean }>`
  width: 40px;
  height: 20px;
  background-color: ${({ checked, theme }) =>
    checked ? theme.colors.brand_main : theme.colors.diary_100};
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const SwitchButton = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ checked }) => (checked ? '22px' : '2px')};
  transition: left 0.2s ease-in-out;
`;

export default Switch;
