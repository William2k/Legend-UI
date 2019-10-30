import AppState from "../state-model";

export const getCurrentUserSelector = (state: AppState) => state.currentUser;
export const getUserSelector = (state: AppState) => getCurrentUserSelector(state).user;
export const getUserSubsSelector = (state: AppState) => getCurrentUserSelector(state).subscriptions;
export const getUserSettingsSelector = (state: AppState) => getUserSelector(state).settings;