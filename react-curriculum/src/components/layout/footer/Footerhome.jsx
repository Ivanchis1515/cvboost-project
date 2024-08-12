//importaciones de react
import React from 'react'

//navegacion entre pantallas
import { Link } from 'react-router-dom'

const Footerhome = () => {
    return (
        <>
            <footer id="footer-multi" className="bg-light design-v2 py-5">
                <div className="container">
                    <div className="row justify-content-between" style={{ fontSize: '1.5em' }}>
                        <div className="col-md-4 ">
                            <div id="logo-multi">
                                <Link to="/">
                                    <img className="logo-dark" width="180" height="43" src="https://rapidocv.com/images/rapidocv/home/logo.svg" alt="Logo rapidocv.com" />
                                </Link>
                                <p className="lead">
                                    Crea un CV impactante y una carta de presentación. Maximice sus posibilidades de conseguir el trabajo de sus sueños.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h5>
                                Plantillas
                                
                            </h5>
                            <ul className="list-unstyled">
                                <li><Link to="/create-csv">CV</Link></li>
                                {/* <li><a href="https://rapidocv.com/cv-profesional">CV profesional</a></li>
                                <li><a href="https://rapidocv.com/cv-sin-experiencia">CV sin experiencia</a></li>
                                <li><a href="https://rapidocv.com/cv-europass">CV Europass</a></li> */}
                            </ul>
                        </div>

                        <div className="col-md-2">
                            <h5>
                                CVBoost
                            </h5>
                            <ul className="list-unstyled">
                                <li><Link to="/">Acerca de</Link></li>
                                <li><Link to="/">Funcionalidades</Link></li>
                                <li><Link to="">Área de cliente</Link></li>
                                <li><Link to="/">Precios</Link></li>
                                <li><Link to="/">Contacta con nosotros</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-4" style={{ fontSize: '1em' }}>
                        <div className="col-md-6">
                            <p>© 2024, CVBoost. Todos los derechos reservados.</p>
                        </div>
                        <div className="col-md-6 text-right">
                            <ul className="list-inline">
                                <li className="list-inline-item"><Link to="/">Aviso legal</Link></li>
                                <li className="list-inline-item"><Link to="/">Condiciones generales de venta</Link></li>
                                <li className="list-inline-item"><Link to="/">Política de reembolso</Link></li>
                                <li className="list-inline-item"><Link to="/">Declaración de privacidad</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footerhome