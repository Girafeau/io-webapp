export default function extractTokenFromStorage() {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    if (user && user.token) {
        return user;
    } else {
        return '';
    }
}
