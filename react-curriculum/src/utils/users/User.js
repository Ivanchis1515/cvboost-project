//libreria axios
import axios from 'axios';

//crear una instancia personalizada de axios
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

//funcion para guardar la aceptacion de los terminos
export const acceptTerms = async (userId, termsId) => {
    const url = "/users/accept_terms"
    const response = await axiosInstance.post(url, {
        user_id: userId,
        terms_id: termsId,
    });
    return response;
};

//funcion para verificar si el usuario ha aceptado los terminos
export const checkAcceptance = async (userId) => {
    const url = "/users/has_accepted_terms/"
    const response = await axiosInstance.get(url + userId);
    return response.data.has_accepted;
};

export const userDatainfo = async (userId) => {
    const url = "/users/user/"
    const response = await axiosInstance.get(url + userId);
    return response
};

