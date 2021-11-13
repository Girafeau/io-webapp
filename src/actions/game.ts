
import { ROOMS, ROOMS_FAIL } from "./types";
import Game from "../api/game.api";

export const getRooms = async (page?: number, size?: number, callback?: (err: boolean, message : string[] | undefined) => void) => {
    const response = await Game.rooms(page, size);
    if (callback) {
        callback(!!response.error, response.message);
    }
    if (!response.error) {
        return {
            type: ROOMS,
            payload: response.data
        };
    } else {
        return {
            type: ROOMS_FAIL,
            payload: []
        };
    }
}
