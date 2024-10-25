import styled from 'styled-components';
import DetailPostContent from './DetailPostContent';

const WorryContent = () => {
  return (
    <Wrapper>
      <h2>고민</h2>
      <DetailPostContent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin-left: 4px;
  }
`;

export default WorryContent;
