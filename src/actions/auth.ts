import AuthService from '../services/auth.service';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SET_MESSAGE, SIGNUP_FAIL, SIGNUP_SUCCESS } from "./types";
import { AppDispatch } from "../store";

export const signup = (email: string, username: string,  password: string) => async (dispatch: AppDispatch): Promise<AppDispatch> => {
    const content = await AuthService.signup(email, username, password);
    console.log(content)
    if(!content.error) {
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: ''
        });
        dispatch({
            type: SET_MESSAGE,
            payload: []
        });
    } else {
        dispatch({
            type: SIGNUP_FAIL,
            payload: ''
        });
        dispatch({
            type: SET_MESSAGE,
            payload: content.message
        });
    }
    return content;
}


export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    const content = await AuthService.login(email, password);
    console.log(content)
    if(!content.error) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: content
        });
        dispatch({
            type: SET_MESSAGE,
            payload: []
        });
    } else {
        dispatch({
            type: LOGIN_FAIL,
            payload: ''
        });
        dispatch({
            type: SET_MESSAGE,
            payload: content.message
        });
    }

    return content;
}

export const logout = () => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGOUT,
        payload: ''
    });
}
