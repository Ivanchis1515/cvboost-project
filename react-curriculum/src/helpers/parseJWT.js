export const parseJWT = (token) => {
    if (!token) {
        throw new Error('Token no proporcionado');
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Token JWT inválido');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);

    return JSON.parse(jsonPayload);
};
