import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DropDownArrow from '../../../assets/comuunity-dropdown.svg';

type SortKey = 'asc' | 'desc' | 'likes';
type SortOptions = Record<SortKey, string>;

interface DropDownPropTypes {
  isSorted: SortKey;
  setIsSorted: React.Dispatch<React.SetStateAction<SortKey>>;
}

const DropDown = ({ setIsSorted, isSorted }: DropDownPropTypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const SelectContainerRef = useRef<HTMLDivElement | null>(null);
  const sortOptions: SortOptions = {
    desc: '최신순',
    asc: '나중순',
    likes: '좋아요순',
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSorted = (option: SortKey) => {
    setIsSorted(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        SelectContainerRef.current &&
        !SelectContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const availableOptions = Object.entries(sortOptions).filter(
    ([key]) => key !== isSorted
  );

  return (
    <Wrapper ref={SelectContainerRef}>
      <DefaultLayout onClick={handleOpen}>
        <Default>{sortOptions[isSorted]}</Default>
        {isOpen ? (
          <img
            src={DropDownArrow}
            alt="dropDown arrow"
            style={{ transform: 'rotate(180deg)' }}
          />
        ) : (
          <img src={DropDownArrow} alt="dropDown arrow" />
        )}
      </DefaultLayout>
      {isOpen && (
        <SelectOptions>
          {availableOptions.map(([key, value]) => (
            <Option key={key} onClick={() => handleSorted(key as SortKey)}>
              {value}
            </Option>
          ))}
        </SelectOptions>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 14px 2px 14px 0;
  position: relative;
  width: 5rem;
`;

const DefaultLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 6px;
  position: relative;
`;

const Default = styled.div`
  text-align: center;
  color: #ffffff;
`;

const SelectOptions = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  position: absolute;
  top: 100%;
  z-index: 10;
`;

const Option = styled.div`
  display: flex;
  width: 100%;
  border-radius: 12px;
  height: 1.5rem;
  background-color: #3e3960;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

export default DropDown;
