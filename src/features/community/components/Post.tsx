import styled from 'styled-components';
import { Content, PostReaction, UserInfo } from '../components';

const Post = () => {
  return (
    <Wrapper>
      <UserInfo />
      <Content />
      <PostReaction />
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
