import {combineReducers} from "redux";
import usersReducer from "./user";
import wordsReducer from "./words";

export default combineReducers({users: usersReducer, words:wordsReducer});