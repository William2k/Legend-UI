import {
  FullUser,
  UserResponse,
  UserSettings
} from "../../global/models/user-models";
import { CurrentUserActionTypes } from "./actions";
import { Action } from "redux";

export interface CurrentUserState {
  isFetching: boolean;
  isPosting: boolean;
  isLoggedIn: boolean;
  user: FullUser;
}

export interface GetUserRequest
  extends Action<CurrentUserActionTypes.GETUSER_REQUEST> {}

export interface GetUserSuccess
  extends Action<CurrentUserActionTypes.GETUSER_SUCCESS> {
  payload: UserResponse;
}

export interface GetUserCanceled
  extends Action<CurrentUserActionTypes.GETUSER_CANCELED> {}

export interface GetUserFailure
  extends Action<CurrentUserActionTypes.GETUSER_FAILURE> {}

export interface SignInRequest
  extends Action<CurrentUserActionTypes.SIGNIN_REQUEST> {}

export interface SignInSuccess
  extends Action<CurrentUserActionTypes.SIGNIN_SUCCESS> {
  payload: UserResponse;
}

export interface SignInFailure
  extends Action<CurrentUserActionTypes.SIGNIN_FAILURE> {}

export interface SignOutRequest
  extends Action<CurrentUserActionTypes.SIGNOUT_REQUEST> {}

export interface SignOutSuccess
  extends Action<CurrentUserActionTypes.SIGNOUT_SUCCESS> {}

export interface SignUpRequest
  extends Action<CurrentUserActionTypes.SIGNUP_REQUEST> {}

export interface SignUpSuccess
  extends Action<CurrentUserActionTypes.SIGNUP_SUCCESS> {}

export interface SignUpPasswordFailure
  extends Action<CurrentUserActionTypes.SIGNUP_PASSWORD_FAILURE> {}

export interface SignUpFailure
  extends Action<CurrentUserActionTypes.SIGNUP_FAILURE> {}

export interface SaveSettingsRequest
  extends Action<CurrentUserActionTypes.SAVE_SETTINGS_REQUEST> {}

export interface SaveSettingsSuccess
  extends Action<CurrentUserActionTypes.SAVE_SETTINGS_SUCCESS> {
  payload: UserSettings;
}

export interface SaveSettingsFailure
  extends Action<CurrentUserActionTypes.SAVE_SETTINGS_FAILURE> {}

export type CurrentUserActions =
  | GetUserRequest
  | GetUserSuccess
  | GetUserCanceled
  | GetUserFailure
  | SignInRequest
  | SignInSuccess
  | SignInFailure
  | SignOutRequest
  | SignOutSuccess
  | SignUpRequest
  | SignUpSuccess
  | SignUpPasswordFailure
  | SignUpFailure
  | SaveSettingsRequest
  | SaveSettingsSuccess
  | SaveSettingsFailure;
