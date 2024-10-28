export interface LoginFormProps {
  onSubmit?: (loginData: LoginData) => void;
}

export interface LoginData {
  username: string;
  password: string;
}
