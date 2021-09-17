import { API_URL } from "../constants";
import extractTokenFromStorage from "../utils/auth-header";

class Game {

    async rooms(page?: number, size?: number) {
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
