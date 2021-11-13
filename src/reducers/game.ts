import {
    ROOMS,
    ROOMS_FAIL,
} from "../actions/types";

const initialState = { rooms: [] };

export default (state = initialState, action: { type: any; payload: any; }) => {
    const { type, payload } = action;
    switch (type) {
        case ROOMS:
            return {
                ...state,
                rooms: payload
            };
        case ROOMS_FAIL:
            return {
                ...state,
                rooms: []
            };
        default:
            return state;
    }
}
