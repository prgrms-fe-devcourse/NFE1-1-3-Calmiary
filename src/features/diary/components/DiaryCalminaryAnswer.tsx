import styled from 'styled-components';

function DiaryCalminaryAnswer() {
  return (
    <S_DiaryMyWorryWrapper>
      <S_AnswerContainer>
        <p>Calminary의 답변</p>
      </S_AnswerContainer>
      <S_MyWorryText>
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
        고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용 고민 내용
      </S_MyWorryText>
    </S_DiaryMyWorryWrapper>
  );
}

export default DiaryCalminaryAnswer;

const S_DiaryMyWorryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  font-size: 14px;
`;

const S_AnswerContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  font-size: 17px;
  margin-bottom: 10px;

  p {
    margin-left: 10px;
  }

  div {
    margin-right: 5px;
  }
`;

const S_MyWorryText = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  border: 3px solid ${({ theme }) => theme.colors.diary_100};
`;
