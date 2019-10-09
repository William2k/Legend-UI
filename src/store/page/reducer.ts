import { PageActionTypes } from "./actions";
import { PageState, PageActions } from "./types";
import { backgroundColours } from "../../global/colours";

const initialState = {
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
    default:
  }

  return state;
};
