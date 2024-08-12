//importaciones de react
import React, { useEffect } from 'react';

//importacion del enrutador
import Router from './routes/Router';

//importacion de la libreria Animated on Scroll
import AOS from 'aos';
import 'aos/dist/aos.css';

//importacion del contexto de la aplicacion
import ContextProvider from './context/ContextProvider';

const App = () => {
    //useeffect para renderizar las animaciones despues de ejecutar el codigo
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <>
            <ContextProvider>
                <Router /> {/* este es el contenido */}
            </ContextProvider>
        </>
    )
}

export default App