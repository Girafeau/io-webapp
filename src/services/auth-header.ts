export default function extractJWT() {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    if (user && user.accessToken) {
        return user.accessToken;
    } else {
        return '';
    }
}
