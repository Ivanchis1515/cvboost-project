//importaciones de react
import React, { useState, useContext } from 'react'

//navegacion entre paginas
import { Link, useNavigate } from 'react-router-dom'

//utils
import { loginUser } from '../../utils/RegisterLogin/RegisterLogin';

//contexto
import { curriculumContext } from '../../context/curriculumContext';

//recursos
import Logo from "../../../public/dist/img/AdminLTELogo.png"
import LogoletrasDark from "../../assets/img/LogoletrasDark.png";

const Login = () => {
    const { fetchUserData } = useContext(curriculumContext); //variables globales
    const navigate = useNavigate(); //navegacion programatica
    const [email, setEmail] = useState(''); //correo
    const [password, setPassword] = useState(''); //contraseña
    const [errors, setErrors] = useState({}); //errores interfaz

    // Validación del formulario
    const validateForm = () => {
        const errors = {}; //almacena los errores como objeto

        if (!email) {
            errors.email = 'El campo de correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'El correo electrónico no es válido';
        }

        if (!password) {
            errors.password = 'El campo de contraseña es obligatorio';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //deten la accion predeterminada(envio de formulario)

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); //sino hay errores limpia la variable

        try {
            const response = await loginUser(email, password);

            if (response.status === 200) {
                sessionStorage.setItem('authToken', response.data.token); //accede a los datos dentro de response.data

                //despues de iniciar sesion, intenta cargar los datos del usuario
                await fetchUserData();

                //si el registro es exitoso
                navigate('/');//redirigir a la pagina
            } else {
                setErrors({ ...errors, general: response.msg || 'Error al iniciar sesión' });
            }
        } catch (error) {
            setErrors({ ...errors, general: 'Error al procesar la solicitud' });
        }
    };

    return (
        <div className="login-page"
            style={{
                height: "100vh",
                background: "url(https://conecta.tec.mx/sites/default/files/styles/header_full/public/2023-01/como-elaborar-un-curriculum-nota-conecta.jpg.webp?itok=Tkx4buBA) no-repeat center center fixed",
                backgroundSize: "cover",
            }}
        >
            <div className="login-box">
                <div className="login-logo">
                    <Link to="/">
                        <img className="logo-dark img-fluid" width={200} src={LogoletrasDark} alt="CvBoost" />
                    </Link>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg lead">¡Hola de nuevo! Inicie sesión en su cuenta y continue</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            {errors.general &&
                                <div className="alert alert-danger alert-dismissible">
                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                    <h5><i className="icon fas fa-ban" />Alert!</h5>
                                    {errors.general}
                                </div>
                            }
                            <div className="row justify-content-center align-items-center">
                                <div className="col-6">
                                    <button type="submit" className="btn btn-success btn-block">Iniciar sesión</button>
                                </div>
                            </div>
                        </form>
                        <div className="social-auth-links text-center mb-3">
                            <p>- O -</p>
                            <Link to="/register" className="text-center">Crea una cuenta ahora</Link>
                            {/* <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                            </a> */}
                        </div>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
            {/* /.login-box */}

        </div>
    )
}

export default Login