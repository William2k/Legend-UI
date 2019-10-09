import { CurrentUserState } from "./currentUser/types";
import { PageState } from "./page/types";
import { RouterState } from "connected-react-router";

export default interface AppState {
    currentUser: CurrentUserState;
    page: PageState;
    router: RouterState;
}