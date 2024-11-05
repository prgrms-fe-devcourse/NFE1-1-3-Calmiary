import styled from 'styled-components';
import { Comments, CommentInput } from './index';
import { CommentsContentPropTypes } from '../types';

const CommentsContent = ({
  comment,
  postId,
  userId,
  refetchComments,
}: CommentsContentPropTypes) => {
  return (
    <Wrapper>
      <h2>댓글</h2>
      {comment &&
        comment.map((comment) => (
          <Comments
            key={comment.comment_id}
            nickname={comment.nickname}
            content={comment.content}
          />
        ))}
      <CommentInput
        postId={postId}
        userId={userId}
        refetchComments={refetchComments}
      />
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
