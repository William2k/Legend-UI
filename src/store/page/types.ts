import { PageActionTypes } from "./actions";
import { Action } from "redux";

export enum PageEnum {
  None,
  Post,
  Group,
  Posts,
  Groups
}

export interface CurrentPage {
  page: PageEnum;
  obj: {};
}

export interface PageState {
  currentPage: CurrentPage;
  bgColour: string;
}

export interface SetPageColour extends Action<PageActionTypes.SET_PAGECOLOUR> {
  payload: string;
}

export interface RemovePageColour
  extends Action<PageActionTypes.REMOVE_PAGECOLOUR> {}

export interface SetCurrentPage
  extends Action<PageActionTypes.SET_CURRENT_PAGE> {
  payload: CurrentPage;
}

export interface RemoveCurrentPage
  extends Action<PageActionTypes.REMOVE_CURRENT_PAGE> {}

export type PageActions = SetPageColour | RemovePageColour | SetCurrentPage | RemoveCurrentPage;
