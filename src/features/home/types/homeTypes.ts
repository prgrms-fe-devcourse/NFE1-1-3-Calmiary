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
