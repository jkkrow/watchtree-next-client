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

export interface GetUserRequest {
  user: User;
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

export type UserType = 'native' | 'google';

export type MembershipName = 'standard' | 'business' | 'enterprise';
