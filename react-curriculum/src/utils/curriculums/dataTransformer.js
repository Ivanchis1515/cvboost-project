//funcion para transformar datos segun la tabla
export const getTransformationFunction = (tableName) => {
    switch (tableName) {
        case 'userinformation':
            return (data) => ({
                name: data.name,
                surname: data.surname,
                city: data.city,
                municipality: data.municipality,
                address: data.address,
                colony: data.colony,
                postalCode: data.postal_code,
                phone: data.phone,
                email: data.email,
                photo: `http://127.0.0.1:8000/utils/photo/${data.photo}`
            });
        case 'other':
            return (data) => ({
                name: data.name,
                surname: data.surname,
                city: data.city,
                municipality: data.municipality,
                address: data.address,
                colony: data.colony,
                postalCode: data.postal_code,
                phone: data.phone,
                email: data.email,
                photo: `http://127.0.0.1:8000/utils/photo/${data.photo}`
            });
        default:
            return (data) => data; //no transformar si no hay funcion definida
    }
};