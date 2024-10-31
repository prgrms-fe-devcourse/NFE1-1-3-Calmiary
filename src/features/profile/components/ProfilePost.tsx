import styled from 'styled-components';
import { Icon } from '../../../components/ui/Icon';
import { UserPostPropTypes } from '../types/profileTypes';

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${year}/${month}/${day}`;
};

export default function ProfilePost({
  content,
  likes,
  createdAt,
  nickname,
  comments,
  profileImg,
}: UserPostPropTypes) {
  return (
    <LikePostArea>
      <PostHead>
        <UserBox>
          <ImageArea>
            <img src={profileImg} alt="" />
          </ImageArea>
          <span>{nickname}</span>
        </UserBox>
        <DateBox>{formatDate(createdAt)}</DateBox>
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
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
