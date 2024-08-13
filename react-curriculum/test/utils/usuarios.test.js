const { checkAcceptance } = require('../../src/utils/users/User');

describe('Pruebas sobre las funciones de Usuarios', () => {
   
    test('Evaluando función que valida si un usuario por ID acepto terminos', async () => {
        const id = 1;
        const usuario = checkAcceptance(id);
        const respuesta = {
            "status": "ok",
            "msg": "Sí hay usuario",
            "data": {
                "id_usuario": 1
            }
        }
        expect(usuario).toBe(respuesta);
    });
})