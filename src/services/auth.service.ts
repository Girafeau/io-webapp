import {API_URL, SERVER_URL} from "../constants";

class AuthService {

    async login(email: string, password: string) {
        const data = { email, password };
        const response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const content = await response.json();
        if (content.accessToken) {
            localStorage.setItem('user', JSON.stringify(content));
        }
        return content;
    }

    logout() {
        localStorage.removeItem('user');
    }


    async signup(email: string, username: string, password: string) {
        const data = { email, username, password };
        console.log(data)
        const response = await fetch(API_URL + '/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}

export default new AuthService();
