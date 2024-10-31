import styled from 'styled-components';
import { UserInfo } from './index';
import { UserDataType } from '../types';
import { Icon } from '../../../components/ui/Icon';

const DetailPostContent = ({
  content,
  likesCount,
  userInfo,
  user_id,
}: {
  content?: string;
  likesCount?: number;
  userInfo?: UserDataType;
  user_id?: number;
}) => {
  return (
    <Wrapper>
      <UserInfo user_info={userInfo} />
      <Content>{content}</Content>
      <EmpathyLayout>
        {likesCount === 0 ? (
          <Icon type="community_empty_heart" alt="emptyHeart" />
        ) : (
          <Icon type="community_filed_heart" alt="filledHeart" />
        )}
        <p>{likesCount}</p>
      </EmpathyLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 26px;
  border-radius: 15px;
  background-color: rgb(147, 143, 164, 0.4);
  width: 100%;
`;

const Content = styled.div`
  line-height: 22px;
  color: #ffffff;
`;

const EmpathyLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    color: #ffffff;
  }
`;

export default DetailPostContent;
