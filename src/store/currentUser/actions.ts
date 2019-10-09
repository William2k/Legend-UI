import axios from "axios";
import { push } from "connected-react-router";
import { SignIn, SignUp, UserSettings } from "../../global/models/user-models";
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
  SaveSettingsFailure
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

  GETUSER_REQUEST = "[GetUser] GetUser Request",
  GETUSER_FAILURE = "[GetUser] GetUser Failure",
  GETUSER_SUCCESS = "[GetUser] GetUser Success",
  GETUSER_CANCELED = "[GetUser] GetUser Cancel",

  SAVE_SETTINGS_REQUEST = "[Save Settings] Save Settings_Requested",
  SAVE_SETTINGS_SUCCESS = "[Save Settings] Save Settings Successful",
  SAVE_SETTINGS_FAILURE = "[Save Settings] Save Settings Failed"
}

export const currentUserActions = {
  getUser: () => async (dispatch: Dispatch, getState: () => AppState) => {
    const token = localStorage.getItem("JwtToken");

    if (!token) {
      return dispatch({} as GetUserCanceled);
    }

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    dispatch({} as SignInRequest);

    try {
      const response = await axios.get("user/auth");
      const data = response.data;
      dispatch({ payload: data } as SignInSuccess);
    } catch (error) {
      dispatch({} as SignInFailure);
    }
  },
  signInUser: (payload: SignIn) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({} as SignInRequest);

    try {
      const response = await axios.post("account/signin", payload);
      const data = response.data;

      localStorage.setItem("JwtToken", data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      dispatch({ payload: data } as SignInSuccess);
      dispatch(push("/"));
    } catch (error) {
      dispatch({} as SignInFailure);
    }
  },
  signOutUser: () => (dispatch: Dispatch, getState: () => AppState) => {
    localStorage.removeItem("JwtToken");
    axios.defaults.headers.common.Authorization = null;
    dispatch({} as SignOutSuccess);
    dispatch(push("/"));
  },
  signUpUser: (payload: SignUp) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    if (payload.password !== payload.confirmPassword) {
      // will add a validator function to validate the password for complexity
      return dispatch({} as SignUpPasswordFailure);
    }

    delete payload.confirmPassword;
    payload.settings = getState().currentUser.user.settings; // saves the default settings to user object

    dispatch({} as SignUpRequest);

    try {
      await axios.post("account/signup", payload);

      dispatch({} as SignUpSuccess);
      dispatch(push("/account/signin"));
    } catch (error) {
      dispatch({} as SignUpFailure);
    }
  },
  saveSettings: (payload: UserSettings) => async (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({} as SaveSettingsRequest);

    try {
      await axios.post(`user/settings`, payload);
      dispatch({ payload } as SaveSettingsSuccess);
    } catch (error) {
      dispatch({} as SaveSettingsFailure);
    }
  }
};
