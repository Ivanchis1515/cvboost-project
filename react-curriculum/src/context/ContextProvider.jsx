//importaciones de react
import React, { useEffect, useState } from 'react';

//importacion del curriculumContext
import { curriculumContext } from './curriculumContext';

//helpers
import { validateToken } from '../helpers/authHelpers';

//utils
import { userDatainfo } from '../utils/users/User';

const ContextProvider = ({ children }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(localStorage.getItem('selectedTemplate') || ""); //guarda el template en el almacenamiento local
    const [selectedColor, setSelectedColor] = useState(localStorage.getItem('selectedColor') || "#17a2b8"); //guarda el color del template en el almacenamiento local
    //datos del usuario
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        localStorage.setItem('selectedTemplate', selectedTemplate);
    }, [selectedTemplate]);

    useEffect(() => {
        localStorage.setItem('selectedColor', selectedColor);
    }, [selectedColor]);

    // Obtener los datos del usuario al montar el contexto o cuando el estado de inicio de sesión cambie
    const fetchUserData = async () => {
        try {
            const decodedToken = validateToken();

            // Verificar si el token es válido y tiene un campo 'sub'
            if (decodedToken && decodedToken.sub) {
                const response = await userDatainfo(decodedToken.sub);
                if (response.status === 200) {
                    setUserData(response.data);
                }
            } else {
                //si no hay token valido podrias redirigir al usuario o manejar el estado de sesion
                setUserData(null); // O gestionar el estado de la sesion según tu logica
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            <curriculumContext.Provider
                value={{
                    //plantillas
                    selectedTemplate, setSelectedTemplate,
                    selectedColor, setSelectedColor,
                    userData, fetchUserData //exponer los datos del usuario en el contexto
                }}
            >
                {children}
            </curriculumContext.Provider>
        </>
    )
}

export default ContextProvider