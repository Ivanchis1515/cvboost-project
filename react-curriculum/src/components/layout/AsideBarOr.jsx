//importaciones de react
import React from 'react';

//navegacion entre paginas
import { Link } from 'react-router-dom';

//recursos
import LogoiconoDark from "../../assets/img/Logoicono.png"

const AsideBarOr = ({ completedSections, activeSection, userData }) => {
    //secciones de la pagina con sus rutas
    const sections = [
        { alias: "user_info", name: "1. Encabezado del CV", route: "/create-csv/section/headerCV" },
        { alias: "user_education", name: "2. Estudios", route: "/create-csv/section/studies" },
        { alias: "user_work_experience", name: "3. Historia laboral", route: "/create-csv/section/workhistory" },
        { alias: "user_skills", name: "4. Competencias", route: "/create-csv/section/skills" },
        { alias: "user_languages", name: "5. Idiomas", route: "/create-csv/section/languages" },
        { alias: "finish", name: "6. Finalizar", route: "/create-csv/finish" }
    ];
    // Secciones que se deben contar en el progreso (excluyendo "finish")
    const sectionsForProgress = sections.filter(section => section.alias !== "finish");

    // Convertir el objeto de completedSections en un array de aliases completados
    const completedSectionAliases = Object.keys(completedSections).filter(alias => Boolean(completedSections[alias]));

    // Filtrar los completados que cuentan para el progreso
    const completedForProgress = completedSectionAliases.filter(alias => alias !== "finish");

    return (
        <>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-light-navy elevation-4" style={{ position: 'fixed', top: 0, bottom: 0, height: '100vh', overflowY: 'auto' }}>
                {/* Brand Logo */}
                <Link to="/" className="brand-link">
                    {/* <img src="../../../public/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} /> */}
                    <img src={LogoiconoDark} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light ml-5">CvBoost</span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            {/* <img src="../../../public/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
                        </div>
                        <div className="info">
                            <span className="d-block lead">{userData?.full_name}</span>
                        </div>
                    </div>
                    {/* <!-- Sidebar Menu --> */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* <li className="nav-header">miCVideal</li> */}
                            {sections.map((section) => {
                                const isCompleted = completedSectionAliases.includes(section.alias);
                                const isActive = activeSection === section.alias;
                                const linkClass = isActive ? "nav-link active" : (isCompleted ? "nav-link" : "nav-link disabled");

                                return (
                                    <li key={section.alias} className="nav-item">
                                        <Link
                                            to={isCompleted ? section.route : "#"}
                                            className={linkClass}
                                        >
                                            <i className={`nav-icon fas fa-${isCompleted ? "check-circle" : "circle"}`}></i>
                                            <p>{section.name}</p>
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="nav-item mt-4">
                                <div className="nav-link">
                                    <i className="nav-icon fas fa-tasks" />
                                    <p>Avance del CV</p>
                                    <div className="progress">
                                        <div className="progress-bar bg-navy" role="progressbar" style={{ width: `${(completedForProgress.length / sectionsForProgress.length) * 100}%` }} aria-valuenow={completedForProgress.length} aria-valuemin="0" aria-valuemax="100">
                                            {Math.round((completedForProgress.length / sectionsForProgress.length) * 100)}%
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* /.sidebar */}
            </aside>
        </>
    )
}

export default AsideBarOr