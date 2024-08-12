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

export const fetchTerms = async() => {
    const url = "/terms/current_terms"
    const response = await axiosInstance.get(url);
    return response
}