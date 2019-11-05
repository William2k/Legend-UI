import axios from "axios";
import { Dispatch, Action } from "redux";

import { AuthenticationFailed } from "./store/currentUser/types";
import { CurrentUserActionTypes } from "./store/currentUser/actions";


export default (dispatch: Dispatch<Action>) => {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error && error.response && error.response.status === 401) {
        dispatch({
          type: CurrentUserActionTypes.AUTHENTICATION_FAILED
        } as AuthenticationFailed);
      }

      return Promise.reject(error);
    }
  );
};
