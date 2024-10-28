import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface DropdownPropTypes {
  category: string;
  data: string[];
  setState: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setSelectedDropDown: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({
  category,
  data,
  setState,
  isOpen,
  setSelectedDropDown,
}: DropdownPropTypes) => {
  const [value, setValue] = useState(category);
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        setSelectedDropDown('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSelectedDropDown]);

  const toggleDropdown = () => {
    if (isOpen) setSelectedDropDown('');
    else setSelectedDropDown(category);
  };

  const handleOptionClick = (value: string) => {
    setValue(value);
    setSelectedDropDown('');
    setState(value);
  };

  return (
    <Container>
      <DropdownToggle onClick={toggleDropdown}>{value}</DropdownToggle>
      {isOpen && (
        <DropdownMenu ref={ref}>
          {data.map((value, index) => (
            <li key={index} onClick={() => handleOptionClick(value)}>
              {value}
            </li>
          ))}
        </DropdownMenu>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  position: relative;
  width: 7rem;
  cursor: pointer;
  font-size: 0.8rem;
`;

const DropdownToggle = styled.div`
  padding: 10px;
  background-color: inherit;
  text-align: center;
  transform: translateY(2rem);
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 3rem;
  width: 100%;
  border-radius: 1rem;
  right: 0;
  border: 1px solid #ccc;
  background-color: ${({ theme }) => theme.colors.write_white200};
  color: ${({ theme }) => theme.colors.brand_bg};
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: auto;
  transform: translateY(2rem);
  li {
    padding: 10px;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f0f0f0;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;
