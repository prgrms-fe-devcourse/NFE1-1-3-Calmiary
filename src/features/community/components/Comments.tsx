import styled from 'styled-components';
import { mockPosts } from '../../../features/community/components/mockData';

const Comments = () => {
  return (
    <Wrapper>
      <p className="nickname">{mockPosts[0].author.nickname}</p>
      <p className="comment">{mockPosts[0].comment}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border-radius: 15px;
  background-color: transparent;
  border: 2px solid rgb(147, 143, 164, 0.4);
  width: 100%;
  color: #ffffff;

  .nickname {
    font-size: 14px;
    font-weight: 500;
  }

  .comment {
    font-size: 16px;
    font-weight: 600;
  }
`;

export default Comments;
