import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import currentUserReducer from "./currentUser/reducer";
import pageReducer from "./page/reducer";
import AppState from "./state-model";

export const history = createBrowserHistory();

const configureStore = (initialState: AppState) => {
  const reducers = {
    currentUser: currentUserReducer,
    page: pageReducer
  };

  const middlewares = [thunk, routerMiddleware(history)];

  // in development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ) {
    enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
  }

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );
};

export default configureStore;
