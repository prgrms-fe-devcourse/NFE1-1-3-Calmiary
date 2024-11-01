import styled from 'styled-components';
import { FilterType } from '../pages/DiaryMainPage';

interface DiaryFilterProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

function DiaryFilter({ selectedFilter, onFilterChange }: DiaryFilterProps) {
  const filters: FilterType[] = ['전체', '공개', '비공개'];

  return (
    <DiaryFilterContainer>
      {filters.map((filter) => (
        <FilterButton
          key={filter}
          isSelected={selectedFilter === filter}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </FilterButton>
      ))}
    </DiaryFilterContainer>
  );
}

export default DiaryFilter;

const DiaryFilterContainer = styled.div`
  width: 100%;
  height: 8.33dvh;
  display: flex;
  justify-content: space-around;
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.write_white200};
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
  color: white;
  background: none;
  border: none;
  font-size: ${({ isSelected }) => (isSelected ? '1.2rem' : '1rem')};
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '400')};
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
