import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

const PostReaction = ({
  like_count,
  comment_count,
}: {
  like_count?: number;
  comment_count?: number;
}) => {
  return (
    <Wrapper>
      <EmpathyLayout>
        <Icon type="community_filed_heart" alt="filledHeart" />
        <p>{like_count}</p>
      </EmpathyLayout>
      <CommentLayout>
        <Icon type="community_comment" alt="comment" />
        <p>{comment_count}</p>
      </CommentLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
  }
`;

const EmpathyLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CommentLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default PostReaction;
