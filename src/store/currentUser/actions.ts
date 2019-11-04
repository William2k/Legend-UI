import Axios, { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import {
  SignIn,
  SignUp,
  UserSettings,
  UserResponseWithToken,
  UserResponse
} from "../../global/models/user-models";
import { Dispatch } from "redux";
import AppState from "../state-model";
import {
  GetUserCanceled,
  SignInRequest,
  SignInSuccess,
  SignInFailure,
  SignOutSuccess,
  SignUpFailure,
  SignUpPasswordFailure,
  SignUpRequest,
  SignUpSuccess,
  SaveSettingsRequest,
  SaveSettingsSuccess,
  SaveSettingsFailure,
  GetSubbedPostsSuccess,
  GetSubbedPostsFailure,
  GetSubbedPostsRequest,
  GetSubbedGroupsRequest,
  GetSubbedGroupsFailure,
  GetSubbedGroupsSuccess
} from "./types";

export enum CurrentUserActionTypes {
  SIGNUP_REQUEST = "[SignUp] SignUp Request",
  SIGNUP_PASSWORD_FAILURE = "[SignUp] SignUp Password Failure",
  SIGNUP_FAILURE = "[SignUp] SignUp Failure",
  SIGNUP_SUCCESS = "[SignUp] SignUp Success",

  SIGNIN_REQUEST = "[SignIn] SignIn Request",
  SIGNIN_FAILURE = "[SignIn] SignIn Failure",
  SIGNIN_SUCCESS = "[SignIn] SignIn Success",

  SIGNOUT_REQUEST = "[SignOut] SignOut Request",
  SIGNOUT_SUCCESS = "[SignOut] SignOut Success",
  AUTHENTICATION_FAILED = "[Authentication] Authentication Failed",

  GETUSER_REQUEST = "[GetUser] GetUser Request",
  GETUSER_FAILURE = "[GetUser] GetUser Failure",
  GETUSER_SUCCESS = "[GetUser] GetUser Success",
  GETUSER_CANCELED = "[GetUser] GetUser Cancel",

  SAVE_SETTINGS_REQUEST = "[Save Settings] Save Settings_Requested",
  SAVE_SETTINGS_SUCCESS = "[Save Settings] Save Settings Successful",
  SAVE_SETTINGS_FAILURE = "[Save Settings] Save Settings Failed",

  GET_SUBBED_POSTS_REQUEST = "[Get Subbed Posts] Get Get Subbed Posts Request",
  GET_SUBBED_POSTS_SUCCESS = "[Get Subbed Posts] Get Subbed Posts Success",
  GET_SUBBED_POSTS_FAILURE = "[Get Subbed Posts] Get Subbed Posts Failure",

  GET_SUBBED_GROUPS_REQUEST = "[Get Subbed Groups] Get Get Subbed Groups Request",
  GET_SUBBED_GROUPS_SUCCESS = "[Get Subbed Groups] Get Subbed Groups Success",
  GET_SUBBED_GROUPS_FAILURE = "[Get Subbed Groups] Get Subbed Groups Failure"
}

export const currentUserActions = {
  getUser: () => async (dispatch: Dispatch, getState: () => AppState) => {
    const token = localStorage.getItem("JwtToken");

    if (!token) {
      return dispatch({
        type: CurrentUserActionTypes.GETUSER_CANCELED
      } as GetUserCanceled);
    }

    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    dispatch({ type: CurrentUserActionTypes.SIGNIN_REQUEST } as SignInRequest);

    try {
      const response = (await Axios.get(
        "account/authenticate"
      )) as AxiosResponse<UserResponse>;
      const data = response.data;
      dispatch({
        type: CurrentUserActionTypes.SIGNIN_SUCCESS,
        payload: data
      } as SignInSuccess);

      dispatch(currentUserActions.getSubscribedGroups() as any);
      dispatch(currentUserActions.getSubscribedPosts() as any);
    } catch (error) {
      Axios.defaults.headers.common.Authorization = null;

      dispatch({
        type: CurrentUserActionTypes.SIGNIN_FAILURE
      } as SignInFailure);
    }
  },
  signInUser: (payload: SignIn) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({ type: CurrentUserActionTypes.SIGNIN_REQUEST } as SignInRequest);

    try {
      const response = (await Axios.post(
        "account/signin",
        payload
      )) as AxiosResponse<UserResponseWithToken>;
      const data = response.data;

      localStorage.setItem("JwtToken", data.token);
      Axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      dispatch({
        type: CurrentUserActionTypes.SIGNIN_SUCCESS,
        payload: data.user
      } as SignInSuccess);

      dispatch(currentUserActions.getSubscribedGroups() as any);
      dispatch(currentUserActions.getSubscribedPosts() as any);
    } catch (error) {
      dispatch({
        type: CurrentUserActionTypes.SIGNIN_FAILURE
      } as SignInFailure);
    }
  },
  signOutUser: () => (dispatch: Dispatch, getState: () => AppState) => {
    localStorage.removeItem("JwtToken");
    Axios.defaults.headers.common.Authorization = null;
    dispatch({
      type: CurrentUserActionTypes.SIGNOUT_SUCCESS
    } as SignOutSuccess);
    dispatch(push("/"));
  },
  signUpUser: (payload: SignUp) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    if (payload.password !== payload.confirmPassword) {
      // will add a validator function to validate the password for complexity
      return dispatch({
        type: CurrentUserActionTypes.SIGNUP_PASSWORD_FAILURE
      } as SignUpPasswordFailure);
    }

    delete payload.confirmPassword;
    payload.settings = getState().currentUser.user.settings; // saves the default settings to user object

    dispatch({ type: CurrentUserActionTypes.SIGNUP_REQUEST } as SignUpRequest);

    try {
      await Axios.post("account/signup", payload);

      dispatch({
        type: CurrentUserActionTypes.SIGNUP_SUCCESS
      } as SignUpSuccess);
    } catch (error) {
      dispatch({
        type: CurrentUserActionTypes.SIGNUP_FAILURE
      } as SignUpFailure);
    }
  },
  saveSettings: (payload: UserSettings) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({
      type: CurrentUserActionTypes.SAVE_SETTINGS_REQUEST
    } as SaveSettingsRequest);

    try {
      await Axios.post(`user/settings`, payload);
      dispatch({
        type: CurrentUserActionTypes.SAVE_SETTINGS_SUCCESS,
        payload
      } as SaveSettingsSuccess);
    } catch (error) {
      dispatch({
        type: CurrentUserActionTypes.SAVE_SETTINGS_FAILURE
      } as SaveSettingsFailure);
    }
  },
  getSubscribedPosts: () => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({
      type: CurrentUserActionTypes.GET_SUBBED_POSTS_REQUEST
    } as GetSubbedPostsRequest);

    try {
      const response = (await Axios.get(
        "post/subscribed"
      )) as AxiosResponse<{[key: number]: string;}>;

      dispatch({
        type: CurrentUserActionTypes.GET_SUBBED_POSTS_SUCCESS,
        payload: response.data
      } as GetSubbedPostsSuccess);
    } catch (error) {
      dispatch({
        type: CurrentUserActionTypes.GET_SUBBED_POSTS_FAILURE
      } as GetSubbedPostsFailure);
    }
  },
  getSubscribedGroups: () => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({
      type: CurrentUserActionTypes.GET_SUBBED_GROUPS_REQUEST
    } as GetSubbedGroupsRequest);

    try {
      const response = (await Axios.get("group/subscribed")) as AxiosResponse<
        []
      >;

      dispatch({
        type: CurrentUserActionTypes.GET_SUBBED_GROUPS_SUCCESS,
        payload: response.data
      } as GetSubbedGroupsSuccess);
    } catch (error) {
      dispatch({
        type: CurrentUserActionTypes.GET_SUBBED_GROUPS_FAILURE
      } as GetSubbedGroupsFailure);
    }
  }
};
