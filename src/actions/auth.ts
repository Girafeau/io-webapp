import Authentication from '../api/auth.api';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAIL, SIGNUP_SUCCESS } from "./types";

export const signup = async (email: string, username: string, password: string, callback?: (err: boolean, message : string[]) => void) => {
    const response = await Authentication.signup(email, username, password);
    if (callback) {
        callback(!!response.error, response.message);
    }
    if (!response.error) {
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
    const response = await Authentication.login(email, password);
    if (callback) {
        callback(!!response.error, response.message);
    }
    if (!response.error) {
        return {
            type: LOGIN_SUCCESS,
            payload: response.data
        };
    } else {
        return {
            type: LOGIN_FAIL,
            payload: {}
        };
    }
}

export const logout = () => {
    Authentication.logout();
    return {
        type: LOGOUT,
        payload: {}
    };
}
