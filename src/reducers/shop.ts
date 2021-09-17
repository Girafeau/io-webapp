import {
    COSMETICS,
    COSMETICS_FAIL,
} from "../actions/types";

const initialState = { cosmetics: [] };

export default (state = initialState, action: { type: any; payload: any; }) => {
    const { type, payload } = action;
    switch (type) {
        case COSMETICS:
            return {
                ...state,
                cosmetics: payload
            };
        case COSMETICS_FAIL:
            return {
                ...state,
                cosmetics: []
            };
        default:
            return state;
    }
}
