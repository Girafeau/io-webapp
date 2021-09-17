import {API_URL} from "../constants";
import extractTokenFromStorage from "../utils/auth-header";


export default class User {

    async profile() {
        const response = await fetch(API_URL + '/profile', {
            headers: {
                'Authorization': 'Bearer ' + extractTokenFromStorage(),
                'Accept': 'application/json'
            }
        });
        return await response.json();
    }
}
