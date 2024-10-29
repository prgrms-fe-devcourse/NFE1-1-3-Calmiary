export interface LoginFormProps {
  onSubmit?: (loginData: LoginData) => void;
}

export interface LoginData {
  userid: string;
  password: string;
}

export interface SignUpFormProps {
  onSubmit?: (signUpData: SignUpData) => void;
}

export interface SignUpData {
  userid: string;
  nickname: string;
  password: string;
  password_check: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface LoginData {
  userid: string;
  password: string;
}
