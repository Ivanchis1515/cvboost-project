import { fetchTerms } from "../../src/utils/TermsAndConditions/Terms"

describe('Pruebas sobre los terminos y condiciones', () => {
    test('Evaluando función que valida si existen los terminos y condiciones ', async () => {
        var bandera = false
        const terminos = (await fetchTerms()).data;
        if (terminos != null)bandera = true
        else bandera = false
        const respuesta = true
        //console.log(terminos);
        expect(bandera).toEqual(respuesta);
    });

})
