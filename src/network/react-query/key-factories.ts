import { queryKeys } from './constants';

export const generateUserKey = (userId: number, userToken: string) => {
  return [queryKeys.user, userId, userToken];
};
