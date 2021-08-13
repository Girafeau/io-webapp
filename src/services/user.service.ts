import {SERVER_URL} from "../constants";
import extractJWT from "./auth-header";


export default class UserService {

    async getProfile() {
        const response = await fetch(SERVER_URL + '/profile', {
            headers: {
                'Authorization': 'Bearer ' + extractJWT(),
                'Accept': 'application/json'
            }
        });
        return await response.json();
    }
}
