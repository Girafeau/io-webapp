import {API_URL} from "../constants";
import extractTokenFromStorage from "../utils/auth-header";
import { Response } from './response.api';

export type Cosmetic = {
    name: string,
    price: number,
    image: string
}

class Shop {

    async cosmetics(page?: number, size?: number): Promise<Response<Cosmetic[]>> {
        const response = await fetch(API_URL + `/cosmetics?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + extractTokenFromStorage(),
                'Accept': 'application/json'
            },
        });
        return await response.json();
    }

}

export default new Shop();
