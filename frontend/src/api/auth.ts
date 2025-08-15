export const getAuth = () => {
    window.localStorage.getItem('tokenauth') || null;

    return window.localStorage.getItem('tokenauth') || null
}