import { combineReducers } from "redux";

import count from "./count";
import MainAction from "./MainAction";

const rootReducer = combineReducers({
  count, MainAction
});

export default rootReducer;
