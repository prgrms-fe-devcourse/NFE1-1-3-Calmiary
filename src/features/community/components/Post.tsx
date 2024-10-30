import styled from 'styled-components';
import { PostContent, PostReaction, UserInfo } from './index';
import { PostProps } from '../types';

const Post = (postProps: PostProps) => {
  const { onClick, ...props } = postProps;

  return (
    <Wrapper>
      {props.user_info && props.created_at ? (
        <UserInfo user_info={props.user_info} created_at={props.created_at} />
      ) : (
        <p>Loading...</p>
      )}
      {props.content && <PostContent content={props.content} />}
      <PostReaction
        like_count={props.like_count}
        comment_count={props.comment_count}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 243px;
  border-radius: 15px;
  background-color: rgba(231, 225, 255, 0.4);
  margin-bottom: 36px;
  padding: 20px 26px;
`;

export default Post;
