import styled from 'styled-components';
import commentUpdate from '../../../assets/comment-update.svg';
import axios from 'axios';
import { useState } from 'react';

interface CommentInputPropTypes {
  postId: number | undefined;
  userId: number | undefined;
  refetchComments: () => void;
}

const CommentInput = ({
  postId,
  userId,
  refetchComments,
}: CommentInputPropTypes) => {
  const [commentData, setCommentData] = useState('');

  const PostComment = async () => {
    const trimmedComment = commentData.trim();

    if (trimmedComment.length < 1 || trimmedComment.length > 500) {
      alert('댓글은 공백이 아닌 1자 이상 500자 이하로 작성해주세요');
      return;
    }

    try {
      await axios.post(`/api/community/post/${postId}/comment`, {
        content: commentData,
        user_id: userId,
      });
      setCommentData('');
      refetchComments();
    } catch (e) {
      console.error('댓글 작성에 실패했습니다');
    }
  };

  return (
    <Wrapper>
      <InputLayout
        placeholder="댓글을 입력하세요"
        value={commentData}
        onChange={(e) => setCommentData(e.target.value)}
      />
      <img src={commentUpdate} alt="updateBtn" onClick={PostComment} />
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

  img {
    cursor: pointer;
  }
`;

const InputLayout = styled.textarea`
  border: none;
  background-color: transparent;
  width: 100%;
  margin-right: 4px;
  color: #ffffff;
  resize: none;

  ::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: #ffffff;
  }

  &::-webkit-input-placeholder {
    color: #ffffff; /* Chrome, Safari, Opera */
  }
`;

export default CommentInput;
