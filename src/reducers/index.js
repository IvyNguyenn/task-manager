import { combineReducers } from "redux";
import tasks from "./tasks";
import filter from "./filter";

const appReducer = combineReducers({
    tasks,
    filter
});

export default appReducer;
