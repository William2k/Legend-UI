import AppState from "../state-model";
import { Dispatch } from "redux";
import { SetPageColour, RemovePageColour } from "./types";

export enum PageActionTypes {
  SET_PAGECOLOUR = "[Page] Set Page Colour",
  REMOVE_PAGECOLOUR = "[Page] Remove Page Colour"
}

export const pageActions = {
  setPageColour: (payload: string) => (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({ payload } as SetPageColour);
  },
  removePageColour: () => (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({} as RemovePageColour);
  }
};
