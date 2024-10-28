import { useState } from 'react';
import styled from 'styled-components';

function DiaryMyWorry() {
  // UI 체크하기 위해 만든 state
  const [isPublic, setIsPublic] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  };

  return (
    <S_DiaryMyWorryWrapper>
      <S_AnswerContainer>
        <p>나의 고민</p>
        <div>
          <label htmlFor="publicCheckbox">{isPublic ? '공개' : '비공개'}</label>{' '}
          <input
            type="checkbox"
            id="publicCheckbox"
            name="isPublic"
            checked={isPublic}
            onChange={handleCheckboxChange}
          />
        </div>
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

export default DiaryMyWorry;

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
  background-color: ${({ theme }) => theme.colors.diary_100};
  color: ${({ theme }) => theme.colors.write_white200};
`;
