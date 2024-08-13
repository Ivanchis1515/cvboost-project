import { actualizarEducacion, checkdatasection, checkSections, crearCV, eliminarEducacion, guardareducacion, guardarencabezadocv, obtenerCV } from "../../src/utils/curriculums/curriculums"

describe('Pruebas sobre los curriculumns', () => {

    test('Evaluando función que obtiene el id de la plantilla ', async () => {
        const nombre = "CurriculumV"
        const id = (await obtenerCV(nombre)).data
        const respuesta = {
            "id": 1
        }
        //console.log(id)
        expect(id).toEqual(respuesta)
    });

    test('Evaluando función que registra las plantillas al usuario', async () => {
        const usuario_id = 2
        const cv_id = 1
        const nombre_cv = "CurriculumV"
        const color = "#28a745"
        const cv_user = (await crearCV(usuario_id, cv_id, nombre_cv, color)).data
        //Acceder a la propiedad 'msg'
        const mensaje = cv_user.msg;
        const respuesta = "Documento agregado"
        //console.log(mensaje);
        expect(mensaje).toEqual(respuesta);
    });

    test('Evaluando función que verifique la edicion de una tabla ', async () => {
        const user_id = 2;
        const tabla = ["userinformation"]
        const verificacion = (await checkSections(user_id, tabla)).data.status;
        const respuesta = {
            "userinformation": true
        }
        //console.log(verificacion);
        expect(verificacion).toEqual(respuesta);
    });

    test('Evaluando función que verifique registro de la tabla userinformation', async () => {
        const user_id = 1;
        const tabla = ["userinformation"]
        const verificacion = (await checkdatasection(user_id, tabla)).data.data;
        const respuesta = {
            "userinformation": 'No data available'
        }
        //console.log(verificacion);
        expect(verificacion).not.toEqual(respuesta);
    });

    //Se registraran los datos cada vez que se ejecute
    // test('Evaluando función que realiza registros en la tabla userinformation', async () => {
    //     const data = {
    //         "cvid_user_template": 1,
    //         "id_user": 1,
    //         "name": "Jorge Iván",
    //         "surname": "Hernández Velázquez",
    //         "city": "Heroica Puebla de Zaragoza",
    //         "municipality": "Puebla",
    //         "address": "Privada 46 norte",
    //         "colony": "Agricola Resurgimiento",
    //         "postalCode": 72370,
    //         "phone": "2222713922",
    //         "email": "ivannhdz03@gmail.com",
    //         "photo": "JorgeIvánHernándezVelázquez_219680cfe2604078b33b8f75736ea4aa.jpeg"
    //     }
    //     const verificacion = (await guardarencabezadocv(data)).data;
    //     const respuesta = {
    //         "message": "Información insertada"
    //       }
    //     //console.log(verificacion);
    //     expect(verificacion).toEqual(respuesta);
    // });

    //Se registraran los datos cada vez que se ejecute
    // test('Evaluando función que realiza registros en la tabla usereducation', async () => {
    //     const data = {
    //         "cvid_user_template": 1,
    //         "user_id": 2,
    //         "school": "Universidad Tecnológica de Puebla",
    //         "citySchool": "Puebla",
    //         "certification": "Ingeniería",
    //         "fieldOfStudy": "Desarrolo y gestión del Software",
    //         "startDate": "2024-07-13",
    //         "endDate": "2024-08-13",
    //         "currentlyStudying": 0
    //     }
    //     const verificacion = (await guardareducacion(data)).data;
    //     const mensaje = verificacion.message;
    //     const respuesta = "Campo de estudio agregado exitosamente"
    //     //console.log(mensaje);
    //     expect(mensaje).toEqual(respuesta);
    // });

    //Se actualizaran los datos cada vez que se ejecute
    // test('Evaluando función que actualize registros en la tabla usereducation', async () => {
    //     const data = {
    //         "id": 7,
    //         "cvid_user_template": 2,
    //         "user_id": 2,
    //         "school": "BUAP",
    //         "citySchool": "Puebla",
    //         "certification": "Ingeniería",
    //         "fieldOfStudy": "Desarrolo y gestión del Software",
    //         "startDate": "2024-07-13",
    //         "endDate": "2024-08-13",
    //         "currentlyStudying": 0
    //     }
    //     const verificacion = (await actualizarEducacion(data)).data;
    //     const mensaje = verificacion.message;
    //     const respuesta = "Campo de estudio actualizado exitosamente"
    //     //console.log(mensaje);
    //     expect(mensaje).toEqual(respuesta);
    // });

    //Se eliminaran los datos cada vez que se ejecute
    // test('Evaluando función que elimine registros en la tabla usereducation', async () => {
    //     const id = 23;
    //     const verificacion = (await eliminarEducacion(id)).data;
    //     const mensaje = verificacion.message;
    //     const respuesta = "Campo de estudio eliminado"
    //     //console.log(mensaje);
    //     expect(mensaje).toEqual(respuesta);
    // });

})
