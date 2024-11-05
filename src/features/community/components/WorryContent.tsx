import styled from 'styled-components';
import { UserDataType } from '../types';
import { DetailPostContent } from './index';

const WorryContent = ({
  userInfo,
  content,
  likesCount,
  userId,
}: {
  userInfo?: UserDataType;
  content?: string;
  likesCount?: number;
  userId?: number;
}) => {
  return (
    <Wrapper>
      <h2>고민</h2>
      <DetailPostContent
        userInfo={userInfo}
        content={content}
        likesCount={likesCount}
        user_id={userId}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin-left: 4px;
  }
`;

export default WorryContent;
