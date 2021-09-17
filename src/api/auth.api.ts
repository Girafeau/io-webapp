import {API_URL} from "../constants";

class Authentication {

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
        if (content.data) {
            localStorage.setItem('user', JSON.stringify(content.data));
        }
        return content;
    }

    logout() {
        localStorage.removeItem('user');
    }


    async signup(email: string, username: string, password: string) {
        const data = { email, username, password };
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

export default new Authentication();
