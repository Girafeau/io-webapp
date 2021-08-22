import {API_URL} from "../constants";
import extractJWT from "./auth-header";

class RoomsService {

    async getRooms(page?: number, size?: number) {
        const response = await fetch(API_URL + `/rooms?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + extractJWT(),
                'Accept': 'application/json'
            },
        });
        return await response.json();
    }

}

export default new RoomsService();
