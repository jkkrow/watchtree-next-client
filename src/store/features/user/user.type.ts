export interface UserSliceState {
  info: User | null;
  accessToken?: string | null;
  refreshTokenExp: DateString | null;
}

export interface User {
  id: string;
  type: UserType;
  name: string;
  email: string;
  picture: string;
  verified: boolean;
  admin: boolean;
  membership: Membership | null;
}

export interface Membership {
  id: string;
  name: MembershipName;
  expiresIn: DateString;
  cancelled: boolean;
}

export interface Credentials {
  accessToken: string;
  refreshTokenExp: DateString;
}

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

export interface UpdatePasswordRequest {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DeleteUserRequest {
  email: string;
  password: string;
}

export interface GetCredentialsResponse {
  accessToken: string;
  refreshTokenExp: DateString;
}

export interface SigninResponse extends GetCredentialsResponse {
  user: User;
}

export type UserType = 'native' | 'google';

export type MembershipName = 'standard' | 'business' | 'enterprise';
