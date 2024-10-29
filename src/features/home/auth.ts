import axios from 'axios';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface LoginData {
  userid: string;
  password: string;
}

export const loginApi = async (
  loginData: LoginData
): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(
    'https://www.calmiary-be.org/auth/login',
    {
      id: loginData.userid,
      password: loginData.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};
