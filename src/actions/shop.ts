
import Shop from "../api/shop.api";
import {COSMETICS, COSMETICS_FAIL} from "./types";

export const getCosmetics = async (page?: number, size?: number, callback?: (err: boolean, message : string[] | undefined) => void) => {
    const response = await Shop.cosmetics(page, size);
    if (callback) {
        callback(!!response.error, response.message);
    }
    if (!response.error) {
        return {
            type: COSMETICS,
            payload: response.data
        };
    } else {
        return {
            type: COSMETICS_FAIL,
            payload: []
        };
    }
}
