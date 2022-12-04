export let AuthUtils = {
    /**
     * Metodo utilizado para obtener el token del usuario
     * @returns una cadena
     */
    getUserToken(): string {
        const userToken = JSON.parse(localStorage.getItem('token') || '{}');
        if (userToken !== 'undefined' && userToken !== null) {
            return userToken;
        } else {
            return '';
        }
    },
    /**
     * Metodo utilizado para obtener el token del usuario
     * @returns una cadena
     */
    getUserLogin(): string {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user !== 'undefined' && user !== null) {
            return user;
        } else {
            return '';
        }
    },
    /**
     * metodo utilizado para saber si el usuario se encuentra autenticado
     */
    isLoggedIn(): boolean {
        return !!localStorage.getItem('isLoggedIn');
    }

}
