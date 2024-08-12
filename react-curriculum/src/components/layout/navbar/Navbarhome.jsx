//importaciones de react
import React, {useState, useEffect} from 'react';

//navegacion entre pantallas
import { Link, useNavigate } from 'react-router-dom';

//helper
import { validateToken } from '../../../helpers/authHelpers';

//recursos
import LogoIcono from "../../../assets/img/Logoicono.png";
import UserIcon from "../../../assets/img/user.svg"


const Navbarhome = ({ userData }) => {
    const navigate = useNavigate(); //navegacion programatica
    const [isLoggedIn, setIsLoggedIn] = useState(false); //el usuario esta logeado

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = sessionStorage.getItem('authToken'); //obten el token
            if (token && validateToken()) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        {/* <img className="logo-dark img-fluid" width={160} height={43} src="https://rapidocv.com/images/rapidocv/home/logo.svg" alt="Logo rapidocv.com" /> */}
                        <img className="logo-light img-fluid" width={100} height={100} src={LogoIcono} alt="Logo rapidocv.com" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            {/* Aquí puedes agregar tus enlaces del navbar */}
                                {/* 
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">Redactar un CV</Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item">Experiencia profesional</Link>
                                    <Link className="dropdown-item">Formación</Link>
                                    <Link className="dropdown-item">Habilidades</Link>
                                    <Link className="dropdown-item">Objetivos profesionales</Link>
                                    <Link className="dropdown-item">Generar con IA</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">Plantillas de CV</Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item">CV estudiante</Link>
                                    <Link className="dropdown-item">CV profesional</Link>
                                    <Link className="dropdown-item">CV sin experiencia</Link>
                                    <Link className="dropdown-item">CV Europass</Link>
                                    <Link className="dropdown-item">Generar con IA</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">Carta de presentación</Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item">¿Cómo escribir mi carta de presentación?</Link>
                                    <Link className="dropdown-item">Generar con IA</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link">Área de suscriptor</Link>
                            </li>
                            */}
                        </ul>
                        <div className="navbar-nav ml-auto">
                            {!isLoggedIn && (
                                <>
                                    <Link className="btn btn-outline-success mb-2 mb-lg-0 mr-lg-2" to="/register">Registrarse</Link>
                                    <Link className="btn btn-outline-success mt-2 mt-lg-0" to="/login">Iniciar sesión</Link>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Menu de usuario siempre visible y separado del collapse */}
                    {isLoggedIn && (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown user-menu" style={{ position: 'relative' }}>
                                <a href="" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                    <img src={UserIcon} className="user-image img-circle elevation-2" alt="User Image" />
                                    <span className="d-none d-sm-inline d-lg-inline">{userData?.full_name}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{ position: 'absolute', right: 0 }}>
                                    <li className="user-header bg-lightblue">
                                        <img src={UserIcon} className="img-circle elevation-2" alt="User Image" />
                                        <p>
                                            {userData?.full_name} - {userData?.tipo}
                                            <small style={{fontSize:"1rem"}}>{userData?.email}</small>
                                        </p>
                                    </li>
                                    {/* <li className="user-body">
                                        <div className="row">
                                            <div className="col-4 text-center">
                                                <a href="#">Followers</a>
                                            </div>
                                            <div className="col-4 text-center">
                                                <a href="#">Sales</a>
                                            </div>
                                            <div className="col-4 text-center">
                                                <a href="#">Friends</a>
                                            </div>
                                        </div>
                                    </li> */}
                                    <li className="user-footer">
                                        <Link to="/profile" className="btn btn-default btn-flat">Mi Perfil</Link>
                                        <button className="btn btn-default btn-flat float-right" 
                                            onClick={() => {
                                                sessionStorage.removeItem('authToken');
                                                setIsLoggedIn(false);
                                                navigate('/'); //redirige a la pagina de inicio
                                            }}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbarhome