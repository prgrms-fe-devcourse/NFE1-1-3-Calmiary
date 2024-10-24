import styled from 'styled-components';

const Title = () => {
  return (
    <Wrapper>
      <p>커뮤니티</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;

  p {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
`;

export default Title;
