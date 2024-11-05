import { motion } from 'framer-motion';
import styled from 'styled-components';
import { DiaryCalminaryAnswerPropTypes } from '../types/diaryTypes';

function DiaryCalmiaryAnswer({ aiContent }: DiaryCalminaryAnswerPropTypes) {
  return (
    <DiaryMyWorryWrapper>
      <AnswerContainer>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Calmiary의 답변
        </motion.p>
      </AnswerContainer>
      <MyWorryText
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {aiContent}
      </MyWorryText>
    </DiaryMyWorryWrapper>
  );
}

export default DiaryCalmiaryAnswer;

const DiaryMyWorryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  font-size: 16px;
`;

const AnswerContainer = styled.div`
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

const MyWorryText = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  border: 3px solid ${({ theme }) => theme.colors.diary_100};
  line-height: 1.6;
  white-space: pre-wrap;
`;
