import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import "bootstrap/scss/bootstrap.scss";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import "./index.scss";
import configureStore, { history } from "./store/configureStore";
import AppState from "./store/state-model";

// get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as AppState;
const store = configureStore(initialState);

const rootElem = document.querySelector("#root");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElem
);

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
