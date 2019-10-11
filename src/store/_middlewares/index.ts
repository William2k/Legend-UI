import { Dispatch, Action, MiddlewareAPI } from "redux";

// Allows classed to be passed instead of objects, allowing NGRX action pattern. won't be used for now
export const classToActionMiddleWare = (store: MiddlewareAPI) => (next: Dispatch<Action>) => (action: Action) => {
    next({ ...action });
  };