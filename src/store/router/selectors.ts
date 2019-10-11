import AppState from "../state-model";

export const getRouterSelector = (state: AppState) => state.router;
export const getLocationSelector = (state: AppState) => getRouterSelector(state).location;