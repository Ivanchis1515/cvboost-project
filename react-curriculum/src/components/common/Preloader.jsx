//importaciones de react
import React, { useState, useEffect } from 'react';

//imagen
import LogoIcono from "../../assets/img/Logoicono.png"

const Preloader = ({ setIsLoading }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2000 ms = 2 segundos
        return () => clearTimeout(timer);
    }, [setIsLoading]);

    return (
        <div className="preloader flex-column justify-content-center align-items-center">
            <img className="animation__shake" src={LogoIcono} alt="AdminLTELogo" height={60} width={60} />
        </div>
    );
}

export default Preloader