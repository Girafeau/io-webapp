import {API_URL} from "../constants";
import extractJWT from "./auth-header";

export type Cosmetic = {
    name: string,
    price: number,
    image: string
}

class ShopService {

    async getCosmetics(page?: number, size?: number): Promise<Cosmetic[]> {
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
