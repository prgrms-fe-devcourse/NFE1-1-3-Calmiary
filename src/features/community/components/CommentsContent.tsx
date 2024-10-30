import styled from 'styled-components';
import { Comments, CommentInput } from './index';
import { CommentsContentPropTypes } from '../types';

const CommentsContent = ({ comment }: CommentsContentPropTypes) => {
  return (
    <Wrapper>
      <h2>댓글</h2>
      {comment &&
        comment.map((comment) => (
          <Comments
            key={comment.comment_id}
            userId={comment.user_id}
            content={comment.content}
          />
        ))}
      <CommentInput />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin-left: 4px;
  }
`;

export default CommentsContent;
