import { User } from '../user/user.type';

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface GetCredentialsResponse {
  accessToken: string;
  refreshTokenExp: DateString;
}

export interface SigninResponse extends GetCredentialsResponse {
  user: User;
}
