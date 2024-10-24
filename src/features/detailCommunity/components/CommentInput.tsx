import styled from 'styled-components';
import commentUpdate from '../../../assets/comment-update.svg';

const CommentInput = () => {
  return (
    <Wrapper>
      <InputLayout placeholder="댓글을 입력하세요" />
      <img src={commentUpdate} alt="updateBtn" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;
  border-radius: 14px;
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.write_purple200};
`;

const InputLayout = styled.input`
  border: none;
  background-color: transparent;

  ::placeholder {
    font-size: 1rem;
    font-wieght: 500;
    color: #ffffff;
  }

  &::-webkit-input-placeholder {
    color: #ffffff; /* Chrome, Safari, Opera */
  }
`;

export default CommentInput;
