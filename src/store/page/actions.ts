import AppState from "../state-model";
import { Dispatch } from "redux";
import {
  SetPageColour,
  RemovePageColour,
  SetCurrentPage,
  RemoveCurrentPage,
  CurrentPage
} from "./types";

export enum PageActionTypes {
  SET_PAGECOLOUR = "[Page] Set Page Colour",
  REMOVE_PAGECOLOUR = "[Page] Remove Page Colour",
  SET_CURRENT_PAGE = "[Current Page] Set Current Page",
  REMOVE_CURRENT_PAGE = "[Current Page] Remove Current Page"
}

export const pageActions = {
  setPageColour: (payload: string) => (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({
      type: PageActionTypes.SET_PAGECOLOUR,
      payload
    } as SetPageColour);
  },
  removePageColour: () => (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({ type: PageActionTypes.REMOVE_PAGECOLOUR } as RemovePageColour);
  },
  setCurrentPage: (currentPage: CurrentPage) => (
    dispatch: Dispatch,
    getState: () => AppState
  ) => {
    dispatch({
      type: PageActionTypes.SET_CURRENT_PAGE,
      payload: currentPage
    } as SetCurrentPage);
  },
  removeCurrentPage: () => (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({
      type: PageActionTypes.REMOVE_CURRENT_PAGE
    } as RemoveCurrentPage);
  }
};
