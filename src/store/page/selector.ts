import AppState from "../state-model";

export const getPageSelector = (state: AppState) => state.page;
export const getCurrentPageSelector = (state: AppState) => getPageSelector(state).currentPage;