import { combineReducers } from "redux";
import counter from "./counter";
import posts from "../../redux-middleware-5-promise/modules/_posts";

const rootReducer = combineReducers({ counter, posts });

export default rootReducer;
