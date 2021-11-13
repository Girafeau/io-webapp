export default function extractTokenFromStorage() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user && user.token) {
        return user;
    } else {
        return '';
    }
}
