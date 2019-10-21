import axios from "axios";
import { Dispatch, Action } from "redux";

import { useConfig } from "./global/config";
import { AuthenticationFailed } from "./store/currentUser/types";
import { CurrentUserActionTypes } from "./store/currentUser/actions";


export default (dispatch: Dispatch<Action>) => {
  axios.defaults.baseURL = useConfig.apiBaseURL;

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        dispatch({
          type: CurrentUserActionTypes.AUTHENTICATION_FAILED
        } as AuthenticationFailed);
      }

      return Promise.reject(error);
    }
  );
};
