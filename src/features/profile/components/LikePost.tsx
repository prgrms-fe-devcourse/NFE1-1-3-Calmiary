import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';

interface LikePostPropTypes {
  content: string;
  likes: number;
  createdAt: string;
  nickname: string;
  comments: number;
}

export default function LikePost({
  content,
  likes,
  createdAt,
  nickname,
  comments,
}: LikePostPropTypes) {
  return (
    <LikePostArea>
      <PostHead>
        <UserBox>
          <ImageArea />
          <span>{nickname}</span>
        </UserBox>
        <DateBox>{createdAt.split('T')[0]}</DateBox>
      </PostHead>
      <TextArea>{content}</TextArea>
      <DataArea>
        <div>
          <Icon type="community_filed_heart" alt="좋아요" size={24} /> {likes}
        </div>
        <div>
          <Icon type="community_comment" alt="댓글" size={24} /> {comments}
        </div>
      </DataArea>
    </LikePostArea>
  );
}

const LikePostArea = styled.div`
  width: 328px;
  height: 243px;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: #6b677d;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ImageArea = styled.div`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

const PostHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const DateBox = styled.div`
  margin-right: 0.5rem;
`;

const TextArea = styled.div`
  height: 200px;
  padding: 0 1rem;
`;

const DataArea = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
