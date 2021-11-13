import { API_URL } from "../constants";
import extractTokenFromStorage from "../utils/auth-header";
import {Response} from "./response.api";

export type Room = {
    name: string,
    seed: string,
    mode: string,
    max: number,
    current: number
}

class Game {

    async rooms(page?: number, size?: number): Promise<Response<Room[]>>{
        const response = await fetch(API_URL + `/rooms?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + extractTokenFromStorage(),
                'Accept': 'application/json'
            },
        });
        return await response.json();
    }

}

export default new Game();
