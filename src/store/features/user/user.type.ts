export interface UserSliceState {
  info: User | null;
  accessToken?: string | null;
  refreshTokenExp: string | null;
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
  expiresIn: string;
  cancelled: boolean;
}

export interface Credentials {
  accessToken: string;
  refreshTokenExp: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  user: User;
  accessToken: string;
  refreshTokenExp: string;
}

export type UserType = 'native' | 'google';

export type MembershipName = 'standard' | 'business' | 'enterprise';