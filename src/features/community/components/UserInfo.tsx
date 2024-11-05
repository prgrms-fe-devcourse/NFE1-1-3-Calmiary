import styled from 'styled-components';
import { UserDataType } from '../types';
import default_profile_image from '../../../assets/default_profile_image.svg';

const UserInfo = ({
  user_info,
  created_at,
}: {
  user_info?: UserDataType;
  created_at?: Date;
}) => {
  return (
    <Wrapper>
      <UserLayout>
        {user_info && (
          <>
            <img
              src={user_info.profile_image || default_profile_image}
              alt="userImg"
            />
            <p>{user_info.nickname}</p>
          </>
        )}
      </UserLayout>
      {created_at && (
        <p>{created_at.toString().split('T')[0].replace(/-/g, '/')}</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #ffffff;
`;

const UserLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 44px;
    height: 44px;
    border-radius: 999px;
  }
`;

export default UserInfo;
