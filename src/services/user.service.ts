import {API_URL} from "../constants";
import extractJWT from "./auth-header";


export default class UserService {

    async getProfile() {
        const response = await fetch(API_URL + '/profile', {
            headers: {
                'Authorization': 'Bearer ' + extractJWT(),
                'Accept': 'application/json'
            }
        });
        return await response.json();
    }
}
