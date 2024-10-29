import axios from 'axios';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: number;
}

interface LoginData {
  userid: string;
  password: string;
}

interface SignUpResponse {
  message: string;
  user_id: string;
}

interface SignUpData {
  userid: string;
  nickname: string;
  password: string;
  password_check: string;
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

export const signUpApi = async (
  signUpData: SignUpData
): Promise<SignUpResponse> => {
  const { data } = await axios.post<SignUpResponse>(
    'https://calmiary-be.org/auth/signup',
    {
      id: signUpData.userid,
      nickname: signUpData.nickname,
      password: signUpData.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};
