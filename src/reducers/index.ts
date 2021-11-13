import { combineReducers } from "redux";
import auth from "./auth";
import shop from "./shop";
import game from "./game";

export default combineReducers({
    auth,
    shop,
    game
});
