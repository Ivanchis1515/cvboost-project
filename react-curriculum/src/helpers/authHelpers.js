import { parseJWT } from './parseJWT';

export const validateToken = () => {
    const token = sessionStorage.getItem('authToken'); //toma el token de la sesion
    if (!token) {
        return null; //si no hay nada devuelve null
    }
    
    try {
        const decodedToken = parseJWT(token); //intenta decodificarlo
        return decodedToken;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
};
