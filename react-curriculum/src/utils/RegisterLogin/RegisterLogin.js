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

//funcion para registro de usuarios
export const registerUser = async(correo, contra, nombre) => {
    const url = "/users/register";
    //solicitud post
    const response = await axiosInstance.post(url, {
        email: correo,
        password: contra,
        full_name: nombre
    });

    //retornar la respuesta
    return response;
}

//funcion para login
export const loginUser = async (correo, contra) => {
    const url = "/users/login";
    const response = await axiosInstance.post(url, {
        email: correo,
        password: contra
    });
    return response;
};