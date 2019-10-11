export interface SignIn {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUp{
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  emailAddress: string;
  settings: UserSettings;
}

export interface UserResponse {
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  roles: string[];
  isActive: boolean;
}

export interface UserResponseWithToken {
  user: UserResponse;
  token: string;
}

export interface FullUser extends UserResponse {
  settings: UserSettings;
}

export interface UserSettings {
  theme: string;
  routeAnimation: string;
}
