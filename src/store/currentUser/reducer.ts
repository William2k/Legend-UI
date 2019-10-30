import { CurrentUserState, CurrentUserActions } from "./types";
import { CurrentUserActionTypes } from "./actions";

const initialState = {
  isFetching: false,
  isPosting: false,
  isLoggedIn: false,
  user: {
    username: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    roles: [],
    isActive: false,
    settings: { routeAnimation: "FADE", theme: "" }
  },
  subscriptions: {
    groups: [],
    posts: {}
  }
} as CurrentUserState;

export default (
  state = initialState,
  action: CurrentUserActions
): CurrentUserState => {
  switch (action.type) {
    case CurrentUserActionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CurrentUserActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: { ...action.payload, settings: state.user.settings },
        isLoggedIn: true,
        isFetching: false
      };
    case CurrentUserActionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case CurrentUserActionTypes.AUTHENTICATION_FAILED:
    case CurrentUserActionTypes.SIGNOUT_SUCCESS: {
      return initialState;
    }
    case CurrentUserActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isPosting: true
      };
    case CurrentUserActionTypes.SIGNUP_SUCCESS:
    case CurrentUserActionTypes.SIGNUP_FAILURE:
    case CurrentUserActionTypes.SIGNUP_PASSWORD_FAILURE:
      return {
        ...state,
        isPosting: false
      };
    case CurrentUserActionTypes.SAVE_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          settings: { ...state.user.settings, ...action.payload }
        }
      };
    case CurrentUserActionTypes.GET_SUBBED_POSTS_SUCCESS:
      return {
        ...state,
        subscriptions: { ...state.subscriptions, posts: action.payload }
      };
    case CurrentUserActionTypes.GET_SUBBED_GROUPS_SUCCESS:
      return {
        ...state,
        subscriptions: { ...state.subscriptions, groups: action.payload }
      };
    default:
  }

  return state;
};
