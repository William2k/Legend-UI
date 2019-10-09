import AppState from "../state-model";
import { Dispatch, Action } from "redux";
import { SetPageColour, RemovePageColour } from "./types";

export enum PageActionTypes {
  SET_PAGECOLOUR = "[Page] Set Page Colour",
  REMOVE_PAGECOLOUR = "[Page] Remove Page Colour"
}

export const pageActions = {
  setPageColour: (payload: string) => (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(<SetPageColour>{ payload});
  },
  removePageColour: () => (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(<RemovePageColour>{});
  }
};