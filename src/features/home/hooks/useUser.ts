import Cookies from 'js-cookie';

export const useUser = () => {
  const getUserId = () => {
    const userId = Cookies.get('user_id');
    const nickname = Cookies.get('nickname');
    if (!userId) {
      return {
        user_id: 'none',
        nickname: 'none',
      };
    }
    return {
      user_id: userId,
      nickname: nickname,
    };
  };

  const getAccessToken = () => {
    const token = Cookies.get('access_token');
    if (!token) {
      throw new Error('Access token not found');
    }
    return token;
  };

  return { getUserId, getAccessToken };
};
