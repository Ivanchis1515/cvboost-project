//importaciones de react
import React, { useContext, useState, useEffect } from 'react';

//importacion de navegacion programatica
import { Link, useNavigate } from 'react-router-dom';

//importacion de layouts
import Navbar from '../../../components/layout/navbar/Navbar';
import Footer from '../../../components/layout/Footer';

//importacion del contexto de aplicacion
import { curriculumContext } from '../../../context/curriculumContext';

const ChooseCSV = () => {
    //toma la variable de progreso
    const { userData } = useContext(curriculumContext);

    const [experience, setExperience] = useState(''); //retoma la experiencia del usuario
    const [isStudent, setIsStudent] = useState(false); //retoma el estatus del usuario

    //variable para desplegar el contenido adicional
    const [showContent, setShowContent] = useState(false);

    //useNavigate permite la navegacion en codigo sin uso de Link
    const navigate = useNavigate();

    //funcion para mostrar el apartado de experiencia
    const handleExperienceClick = (experience) => {
        //guarda la respuesta del usuario en el estado
        setExperience(experience);
        //si el usuario selecciona
        if (experience === 'none' || experience === '0-3') {
            setShowContent(true);
        } else {
            //redirigir a la siguiente pantalla si no seleccione las anteriores opciones
            navigate('/create-csv/select-template', {
                state: { experience: experience }
            });
        }
    }

    const handleStudentStatus = (status) => {
        setIsStudent(status === 'yes');
        navigate('/create-csv/select-template', {
            state: { experience, isStudent: status === 'yes' }
        });
    };

    return (
        <div className="layout-top-nav layout-navbar-fixed layout-footer-fixed">
            {/* Navbar */}
            <Navbar  
                brandText="CvBoost"
                userData={userData}
                // links={[
                //     { href: '/home', text: 'Inicio' },
                //     { href: '/about', text: 'Acerca de' }
                // ]}
                // dropdowns={[
                //     {
                //         id: 1,
                //         text: 'Servicios',
                //         items: [
                //             { id: 1, text: 'Servicio 1', href: '/service1' },
                //             { id: 2, text: 'Servicio 2', href: '/service2', submenu: [
                //                 { id: 3, text: 'Subservicio 1', href: '/subservice1' },
                //                 { id: 4, text: 'Subservicio 2', href: '/subservice2' }
                //             ]}
                //         ]
                //     }
                // ]}
                // rightLinks={[
                //     { href: '/profile', iconClass: 'fas fa-user' },
                //     { href: '/settings', iconClass: 'fas fa-cog' }
                // ]}
                progress={33}
            />
            {/* Navbar */}

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper ml-0">
                {/* Content Header (Page header) */}

                {/* /.content-header */}

                {/* Main content */}
                <div className="content">
                    {/* container-fluid */}
                    <div className="container-fluid">
                        {/* row */}
                        <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                            <div className="col-lg-8 col-md-10 text-center">
                                <h2 className="font-weight-bold">
                                    ¿Cuánto tiempo llevas trabajando?
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        title="Incluye prácticas profesionales, trabajos no remunerados y voluntariado."
                                    >
                                        <i className="fas fa-info-circle"></i>
                                    </span>
                                </h2>
                                <p className="h6 mb-5">Te ayudaremos a planificar mejor tu CV de acuerdo a tu nivel de experiencia.</p>
                                <div className="row">
                                    <div className="col-12 col-md-4 col-lg-4 mb-2">
                                        <label className="btn btn-outline-success w-100" onClick={() => handleExperienceClick('none')}>
                                            Ninguna experiencia
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-4 co-lg-4 mb-2">
                                        <label className="btn btn-outline-success w-100" onClick={() => handleExperienceClick('0-3')}>
                                            0-3 años
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 mb-2">
                                        <label className="btn btn-outline-success w-100" onClick={() => handleExperienceClick('3-5')}>
                                            3-5 años
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-6 mb-2">
                                        <label className="btn btn-outline-success w-100" onClick={() => handleExperienceClick('5-10')}>
                                            5-10 años
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-6 mb-2">
                                        <label className="btn btn-outline-success w-100" onClick={() => handleExperienceClick('10+')}>
                                            Más de 10 años
                                        </label>
                                    </div>
                                </div>
                                {!showContent && (
                                    <div>
                                        <Link className="btn btn-link" to="/create-csv/select-template">Omitir por ahora</Link>
                                    </div>
                                )}
                                {showContent && (
                                    <div className="row justify-content-center align-items-center mt-4" style={{ minHeight: "30vh" }} data-aos="fade-up">
                                        <div className="col-lg-8 col-md-10 text-center">
                                            <h2>¿Eres estudiante?</h2>
                                            <div className="btn-group btn-group-toggle my-4" data-toggle="buttons">
                                                <label className="btn btn-outline-success" onClick={() => handleStudentStatus('yes')}>
                                                    <input type="radio" name="student-options" id="student-option1" autoComplete="off" /> Sí
                                                </label>
                                                <label className="btn btn-outline-success" onClick={() => handleStudentStatus('no')}>
                                                    <input type="radio" name="student-options" id="student-option2" autoComplete="off" /> No
                                                </label>
                                            </div>
                                            <div>
                                                <Link to="/create-csv/select-template" className="btn btn btn-link">Omitir por ahora</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}

            {/* footer */}
            <Footer />
            {/* footer */}
        </div>
    )
}

export default ChooseCSV