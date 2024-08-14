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

//crear edicion de una plantilla cv
export const crearCV = async(user_Id, cv_Id, template, color) => {
    const url = "/cv/cvuser"
    const response = await axiosInstance.post(url, {
        user_id:   user_Id,
        cv_id:     cv_Id,
        template_name:template,
        color:     color
    });
    return response
};

//obitene una cv especifica con el nombre
export const obtenerCV = async (template) => {
    const url ="/cv/cvs/"
    const response = await axiosInstance.get(url + template)
    return response
}

//verifica las secciones del usuario
export const checkSections = async(cv_iduser, tables) => {
    const url = "/cv/user-sections"
    const response = await axiosInstance.post(url, {
        user_id: cv_iduser, //id del documento cv que edita el usuario
        tables: tables //lista de tablas a verificar
    });
    return response
};

//verifica los datos de cada seccion
export const checkdatasection = async(cv_iduser, tables) => {
    const url = "/cv/user-data";
    const response = await axiosInstance.post(url, {
        user_id: cv_iduser, //id del documento cv que edita el usuario
        tables: tables //lista de tablas a extraer informacion
    })
    return response
}

//funcion para guardar foto en el backend
export const uploadFile = async (file, username) => {
    const url = "/utils/upload";
    //crea un formdata
    const formData = new FormData();
    formData.append('file', file); //añade el archivo
    formData.append('username', username); //añade el nombre de usuario

    //enviar la solicitud con axios
    const response = await axiosInstance.post(url, formData);

    return response;
};
// INFORMACION PERSONAL
//guarda la informacion de los datos personales
export const guardarencabezadocv = async (data) => {
    const url = "/cv/userinformation";
    const response = await axiosInstance.post(url, data);
    return response;
};

//INFORMACION ACADEMICA
//guarda la informacion academica
export const  guardareducacion = async(data) => {
    const url = "/cv/user-education";
    const response = await axiosInstance.post(url, data)
    return response
}

//actualiza un registro academico
export const actualizarEducacion = async(data) => {
    const url = "/cv/update-education";
    const response = await axiosInstance.put(url, data);
    return response;
}

//elimina el registro academico
export const eliminarEducacion = async(id) => {
    const url = "/cv/delete-education/"
    const response = await axiosInstance.delete(url + id)
    return response;
}

//EXPERIENCIA LABORAL
//agrega experiencia laboral
export const guardarExperiencia = async(data) => {
    const url = "/cv/userwork-experience";
    const response = await axiosInstance.post(url, data);
    return response
}

//actualiza un registro de experiencia
export const actualizarExperiencia = async(data) =>{
    const url = "/cv/update-work-experience";
    const response = await axiosInstance.put(url, data);
    return response;
}

//elimina la experiencia seleccionada
export const eliminarExperiencia = async(id) => {
    const url = "/cv/delete-work-experience/";
    const response = await axiosInstance.delete(url + id);
    return response;
}

//COMPETENCIAS/APTITUDES
//guarda las competencias
export const guardarCompetencia = async(data) => {
    const url = "/cv/user-skills";
    const response = await axiosInstance.post(url, data);
    return response;
}

//actualiza las competencias del usuario
export const actualizarCompetencia = async(data) => {
    const url = "/cv/update-user-skills"
    const response = await axiosInstance.put(url, data)
    return response;
}

//elimina las competencias del usuario
export const eliminarCompetencia = async(id) => {
    const url = "/cv/delete-user-skills/";
    const response = await axiosInstance.delete(url + id);
    return response
}

//LENGUAJES
//guarda los idiomas del usuario
export const guardaLenguaje = async(data) => {
    const url = "/cv/user-languages";
    const response = await axiosInstance.post(url, data)
    return response
}

//actualiza los idiomas del usuario
export const actualizaLenguaje = async(data) => {
    const url = "/cv/update-user-languages";
    const response = await axiosInstance.put(url, data);
    return response;
}

//elimina los idiomas del usuario
export const eliminarLenguaje = async(id) => {
    const url = "/cv/delete-user-languages/";
    const response = await axiosInstance.delete(url + id)
    return response
}