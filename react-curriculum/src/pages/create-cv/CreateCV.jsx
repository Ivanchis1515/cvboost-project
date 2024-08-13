//importaciones de react
import React, { useState, useEffect } from 'react';

//navegacion entre paginas
import { Link, useNavigate } from 'react-router-dom';

//layouts
import Preloader from '../../components/common/Preloader';

//recursos
import fondoCV from '../../assets/img/create-cv.jpg';
import LogoIcono from "../../assets/img/Logoicono.png";

//helper
import { validateToken } from '../../helpers/authHelpers';

//utils
import { fetchTerms } from '../../utils/TermsAndConditions/Terms';
import { acceptTerms, checkAcceptance } from '../../utils/users/User';

const CreateCV = () => {
    const navigate = useNavigate(); //navegacion programatica

    const [termsAccepted, setTermsAccepted] = useState(false);//cambiar de estado el checkbox
    const [isLoading, setIsLoading] = useState(true);//variable para mostrar el preloader
    const [termsId, setTermsId] = useState(null); //almacena el ID de los terminos
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(null); //verificar aceptacin de terminos

    //funcion para activar el boton cuando se selecciona el checkbox
    const handleCheckboxChange = (e) => setTermsAccepted(e.target.checked);

    //maneja el acepto de terminos y condiciones
    const handleSubmit = async (event) => {
        event.preventDefault(); //deten el evento predeterminado

        if (termsAccepted && termsId) {
            try {
                const decodedToken = validateToken(); //valida el token
                if (!decodedToken) {
                    navigate("/login"); //retorna si es false
                    return;
                }

                const userId = decodedToken.sub; //obten el id del token
                const response = await acceptTerms(userId, termsId); //envialo a la funcion
                if (response.status === 200) {
                    navigate("/"); //si la respuesta es correcta dirige al home
                }
            } catch (error) {
                console.error('Error al guardar la aceptación de los términos:', error);
            }
        } else {
            alert('Debes aceptar los términos y condiciones para continuar.');
        }
    };

    //verifica si el usuario ya acepto los terminos
    useEffect(() => {
        const checkUserAcceptance = async () => {
            const token = sessionStorage.getItem('authToken');
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const decodedToken = validateToken();
                const accepted = await checkAcceptance(decodedToken.sub);
                if (accepted) {
                    setHasAcceptedTerms(true);
                } else {
                    setHasAcceptedTerms(false);
                }
            } catch (error) {
                console.error('Error al verificar aceptación de términos:', error);
            }
        };

        checkUserAcceptance();
    }, [navigate]);

    //carga los terminos si el usuario no ha aceptado
    useEffect(() => {
        const loadTerms = async () => {
            try {
                const response = await fetchTerms();
                if (response.status === 200) {
                    setTermsId(response.data.id);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error al cargar los términos y condiciones:', error);
            }
        };

        if (hasAcceptedTerms === false) {
            loadTerms();
        }
    }, [hasAcceptedTerms]);

    //redirige al usuario basado en el estado de aceptaciin de terminos
    useEffect(() => {
        if (hasAcceptedTerms === true) {
            navigate("/create-csv/experience");
        }
    }, [hasAcceptedTerms, navigate]);

    return (
        <>
            {isLoading && <Preloader setIsLoading={setIsLoading} />}

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper ml-0">
                {/* Main content */}
                <div className="content">
                    {/* container-fluid */}
                    <div
                        className="container-fluid"
                        style={{
                            minHeight: "100vh",
                            background: `url(${fondoCV}) no-repeat center center fixed`,
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                            <div className="col-12 col-md-9 col-lg-7 col-xl-5">
                                <div className="card shadow-sm"
                                    style={{
                                        borderTopLeftRadius: "50px",
                                        borderTopRightRadius: "50px",
                                        borderBottomRightRadius: "50px",
                                        borderBottomLeftRadius: "50px",
                                    }}
                                >
                                    <div className="card-body">
                                        <Link to="/">
                                            <div className="text-center">
                                                <img src={LogoIcono} alt="AdminLTE Logo" className="brand-image img-circle elevation-0 " style={{ opacity: '.8', width: "150px" }} />
                                            </div>
                                        </Link>
                                        <h2 className="font-weight-bold text-center">Sólo tres sencillos pasos</h2>
                                        <div className="p-4">
                                            <ul className="list-unstyled">
                                                <li className="mb-3 d-flex align-items-center ">
                                                    <span className="badge badge-success mr-3" style={{ fontSize: '1rem' }}>1</span>
                                                    <span style={{ fontSize: "1rem", flex: 1, textAlign: 'center' }}><strong className="text-dark">Selecciona</strong> una plantilla de CV de nuestra biblioteca de diseños profesionales.</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-center">
                                                    <span className="badge badge-success mr-3" style={{ fontSize: '1rem' }}>2</span>
                                                    <span style={{ fontSize: "1rem", flex: 1, textAlign: 'center' }}><strong className="text-dark">Crea</strong> tu CV con consejos de nuestros expertos.</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-center">
                                                    <span className="badge badge-success mr-3" style={{ fontSize: '1rem' }}>3</span>
                                                    <span style={{ fontSize: "1rem", flex: 1, textAlign: 'center' }}><strong className="text-dark">Descarga, comparte</strong> tu CV y repite el procedimiento.</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="py-2 text-center">
                                            <form className="form-group" onSubmit={handleSubmit}>
                                                <div className="form-check">
                                                    <input
                                                        className={`form-check-input ${termsAccepted ? 'bg-success' : ''}`}
                                                        type="checkbox"
                                                        id="termsCheckbox"
                                                        onChange={handleCheckboxChange}
                                                        style={{ transform: "scale(1.5)" }}
                                                    />
                                                    <label className="form-check-label h6" htmlFor="termsCheckbox">
                                                        Acepto los <Link to="/terms">Términos y condiciones de uso</Link>.
                                                    </label>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className={`btn btn-success btn-lg mt-3 ${!termsAccepted && 'disabled'}`}
                                                    aria-disabled={!termsAccepted}
                                                >
                                                    Crear mi CV
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}

        </>
    )
}

export default CreateCV