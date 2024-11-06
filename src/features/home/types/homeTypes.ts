export interface LoginFormPropTypes {
  onSubmit?: (loginData: LoginData) => void;
}

export interface LoginData {
  userid: string;
  password: string;
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

export interface SignUpFormPropTypes {
  onSubmit: (data: SignUpData) => void;
  isLoading?: boolean;
}

export interface SignUpData {
  userid: string;
  nickname: string;
  password: string;
  password_check: string;
}
interface StageVariant {
  scale: number;
  rotate: number;
}
export interface StageVariants {
  [key: string]: StageVariant;
}
