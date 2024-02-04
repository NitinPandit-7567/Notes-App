export default function getToken() {
    const token = sessionStorage.getItem('authToken')
    if (token) {
        return token
    } else {
        return false
    }

}