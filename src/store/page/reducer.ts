import { PageActionTypes } from "./actions";
import { PageState, PageActions, PageEnum } from "./types";
import { backgroundColours } from "../../global/colours";

const initialState = {
  currentPage: { page: PageEnum.None, obj: {} },
  bgColour: backgroundColours.default
} as PageState;

export default (state = initialState, action: PageActions): PageState => {
  switch (action.type) {
    case PageActionTypes.SET_PAGECOLOUR:
      return {
        ...state,
        bgColour: action.payload
      };
    case PageActionTypes.REMOVE_PAGECOLOUR:
      return {
        ...state,
        bgColour: backgroundColours.default
      };
    case PageActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case PageActionTypes.REMOVE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: { page: PageEnum.None, obj: {} }
      };
    default:
  }

  return state;
};
