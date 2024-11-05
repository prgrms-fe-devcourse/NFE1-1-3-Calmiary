import styled from 'styled-components';
import Skeleton from '../../../components/Skeleton';

const Comments = ({
  nickname,
  content,
  isLoading,
}: {
  nickname: string;
  content?: string;
  isLoading?: boolean;
}) => {
  return (
    <Wrapper $isLoading={isLoading}>
      {isLoading ? (
        <>
          <Skeleton
            width="100%"
            height="2rem"
            margin="0 0 0.5rem 0"
            $borderRadius="0.5rem"
          />
        </>
      ) : (
        <>
          <p className="nickname">{nickname}</p>
          <p className="comment">{content}</p>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border-radius: 15px;
  background-color: ${({ $isLoading }) =>
    $isLoading ? 'rgba(147, 143, 164, 0.4)' : 'transparent'};
  border: 2px solid rgb(147, 143, 164, 0.4);
  width: 100%;
  color: #ffffff;
  min-height: 4rem;

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
