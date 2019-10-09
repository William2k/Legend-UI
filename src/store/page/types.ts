import { PageActionTypes } from "./actions";
import { Action } from "redux";

export interface PageState {
  bgColour: string;
}

export interface SetPageColour extends Action<PageActionTypes.SET_PAGECOLOUR> {
  payload: string;
}

export interface RemovePageColour
  extends Action<PageActionTypes.REMOVE_PAGECOLOUR> {}

export type PageActions = SetPageColour | RemovePageColour;
