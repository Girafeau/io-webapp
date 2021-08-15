import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";
import extractJWT from "../services/auth-header";
import {AppDispatch, RootState} from "../store";

const user = extractJWT();

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default (state = initialState, action: { type: any; payload: any; }) => {
    const { type, payload } = action;
    switch (type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
