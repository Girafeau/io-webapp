import AuthService from '../services/auth.service';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAIL, SIGNUP_SUCCESS } from "./types";

export const signup = async (email: string, username: string, password: string, callback?: (err: boolean, message : string[]) => void) => {
    const content = await AuthService.signup(email, username, password);
    if (callback) {
        callback(!!content.error, content.message);
    }
    if (!content.error) {
        return {
            type: SIGNUP_SUCCESS,
            payload: {}
        };
    } else {
        return {
            type: SIGNUP_FAIL,
            payload: {}
        };
    }
}


export const login = async (email: string, password: string, callback?: (err: boolean, message : string[]) => void) => {
    const content = await AuthService.login(email, password);
    if (callback) {
        callback(!!content.error, content.message);
    }
    if (!content.error) {
        return {
            type: LOGIN_SUCCESS,
            payload: content
        };
    } else {
        return {
            type: LOGIN_FAIL,
            payload: {}
        };
    }
}

export const logout = () => {
    AuthService.logout();
    return {
        type: LOGOUT,
        payload: {}
    };
}
