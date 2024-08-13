import { loginUser, registerUser } from "../../src/utils/RegisterLogin/RegisterLogin";
import { checkAcceptance, acceptTerms, userDatainfo } from "../../src/utils/users/User";


describe('Pruebas sobre las funciones de Usuarios', () => {

    //Se tendran que cambiar los datos cada vez que se ejecute
    // test('Evaluando función que registra un usuario', async () => {
    //     const correo = 'DavidG@gmail.com';
    //     const contra = 'DavidGz23#';
    //     const nombre = 'David Gonzales';
    //     const usuario = (await registerUser(correo, contra, nombre)).data;
    //     // Acceder a la propiedad 'msg'
    //     const mensaje = usuario.msg;
    //     const respuesta = "Usuario agregado"
    //     //console.log(mensaje);
    //     expect(mensaje).toEqual(respuesta);
    // });

    test('Evaluando función que valida el inicio de sesion de un usuario', async () => {
        const correo = 'jals250808@gmail.com';
        const contra = 'Manchass27#';
        const usuario = (await loginUser(correo,contra)).data;
        //Acceder a la propiedad 'msg'
        const mensaje = usuario.msg;
        const respuesta = "Inicio de sesión exitoso"
        //console.log(mensaje);
        expect(mensaje).toEqual(respuesta);
    });

    test('Evaluando función que valida si un usuario por ID acepto terminos', async () => {
        const id = 1;
        const usuario = await checkAcceptance(id);
        const respuesta = true
        //console.log(usuario);
        expect(usuario).toEqual(respuesta);
    });

    test('Evaluando función que registra el concentimiento de los terminos a un usuario por ID', async () => {
        const id = 1;
        const usuario = (await acceptTerms(id, 1)).data;
        const respuesta = { message: 'Terms accepted successfully' }
        //console.log(usuario);
        expect(usuario).toEqual(respuesta);
    });

    test('Evaluando función que contiene la informacion de usuario por ID', async () => {
        const id = 2;
        const usuario = (await userDatainfo(id)).data;
        const respuesta = {
            id: 2,
            full_name: 'Jose Angel',
            email: 'jals250808@gmail.com',
            tipo: 'Usuario'
        }
        //console.log(usuario);
        expect(usuario).toEqual(respuesta);
    });
})