import axios from "axios";

import { useConfig } from "./global/config";

export default () => {
    axios.defaults.baseURL = useConfig.apiBaseURL;
}