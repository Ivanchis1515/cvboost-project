///importaciones de react 
import React, { useState } from 'react'

//navegacion entre paginas 
import { Link, useNavigate } from 'react-router-dom'

//utils
import { registerUser } from '../../utils/RegisterLogin/RegisterLogin';

//recursos
import Logo from "../../../public/dist/img/AdminLTELogo.png"
import LogoIcono from "../../assets/img/Logoicono.png"

const Register = () => {
    const navigate = useNavigate(); //nevageacion programatica
    const [email, setEmail] = useState(''); //estado para el correo
    const [password, setPassword] = useState(''); //estado para la contraseña
    const [confirmPassword, setConfirmPassword] = useState(''); //contraseña validada
    const [fullName, setFullName] = useState(''); // estado para el nombre completo
    const [errors, setErrors] = useState({}); //errores interfaz

    //validacion del form
    const validateForm = () => {
        const validationErrors = {}; //almacena los errores en forma de objetos

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //email regex
        if (!emailRegex.test(email)) {
            validationErrors.email = 'Correo inválido.'; //si el correo no cumple con el regex
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //password regex
        if (!passwordRegex.test(password)) {
            validationErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluir una letra, un número y un símbolo.'; //si la contraseña no cumple el regex
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Las contraseñas no coinciden.'; //contraseñas invalidas
        }

        if (!fullName) {
            validationErrors.fullName = 'El nombre completo es obligatorio.'; //campo fullName obligatorio
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //deten el evento predeterminado (envio de formulario)

        //validar el formulario
        const validationErrors = validateForm(); //retoma los errores
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); //si hay errores guardalos en la variable
            return;
        }

        //si ya no hay errores limpia la variable
        setErrors({});

        //intenta enviar los datos
        try {
            const response = await registerUser(email, password, fullName); //envia el correo, la contraseña y el nombre completo
            //si la respuesta es 200
            if (response.status === 200) {
                //guardar el token en sessionStorage
                sessionStorage.setItem('authToken', response.data.token); //accede a los datos dentro de response.data
                //si el registro es exitoso
                navigate('/create-csv');//redirigir a la pagina
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error); // Imprimir el error para depuración
            setErrors({ ...errors, general: 'Error al procesar la solicitud' });
        }
    };

    return (
        <div className="register-page">
            {/* Register-box */}
            <div className="register-box">
                <div className="register-logo">
                    {/* <a href="../../index2.html"><b>Cv</b>Boost</a> */}
                    <Link to="/">
                        <img className="logo-dark img-fluid" width={200} height={150} src={LogoIcono} alt="CvBoost" />
                    </Link>
                </div>
                {/* Content-card */}
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg lead">Crea una cuenta</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                    placeholder="Nombre Completo"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Correo"
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
                                    placeholder="Contraseña"
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
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    placeholder="Repite la contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                            </div>
                            {errors.general &&
                                <div className="alert alert-danger alert-dismissible">
                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                    <h5><i className="icon fas fa-ban" />Alert!</h5>
                                    {errors.general}
                                </div>
                            }
                            <div className="row align-items-center justify-content-center">
                                <div className="col-6">
                                    <button type="submit" className="btn btn-success btn-block">Registrarse</button>
                                </div>
                            </div>
                        </form>
                        <div className="social-auth-links text-center">
                            <p style={{ fontSize: "1rem" }}>- ¿Ya tienes una cuenta? -</p>
                            {/* <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2" />
                                Sign up using Facebook
                            </a> */}
                            <Link to="/login" className="text-center">Inicie sesión en su cuenta</Link>
                            {/* <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2" />
                                Sign up using Google+
                            </a> */}
                        </div>
                    </div>
                    {/* /.form-box */}
                </div>{/* /.card */}
            </div>
            {/* /.register-box */}

        </div>
    )
}

export default Register