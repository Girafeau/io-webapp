import {API_URL} from "../constants";
import extractJWT from "./auth-header";

class ShopService {

    async getCosmetics(page?: number, size?: number) {
        const response = await fetch(API_URL + `/cosmetics?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + extractJWT(),
                'Accept': 'application/json'
            },
        });
        return await response.json();
    }

}

export default new ShopService();
