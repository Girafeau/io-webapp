import { combineReducers } from "redux";
import auth from "./auth";
import shop from "./shop";

export default combineReducers({
    auth,
    shop
});
