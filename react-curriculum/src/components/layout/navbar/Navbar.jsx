//importaciones de react
import React, { useContext } from 'react'

//navegacion entre pantallas 
import { Link } from 'react-router-dom'

//importacion del contexto
import { curriculumContext } from '../../../context/curriculumContext'

//recursos
import LogoIcono from "../../../assets/img/Logoicono.png"
import UserIcon from "../,,/../../../assets/img/user.svg"

const Navbar = ({brandText, links, dropdowns, rightLinks, userData, progress}) => {

    return (
        <>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand-md navbar-light navbar-white m-0 align-items-center justify-content-center">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        {/* <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3 mr-3 ml-3" style={{ opacity: '.8', width: "40px" }} /> */}
                        <img src={LogoIcono} alt="AdminLTE Logo" className="brand-image img-circle elevation-3 mr-3 ml-3" style={{ opacity: '.8', width: "60px" }} />
                        <span className="brand-text font-weight-light">{brandText}</span>
                    </Link>

                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse order-3 ml-4" id="navbarCollapse">
                        {/* Left navbar links */}
                        {links && (
                            <ul className="navbar-nav">
                                {links.map((link, index) => (
                                    <li className="nav-item mt-1" key={index}>
                                        <Link to={link.href} className="nav-link">{link.text}</Link>
                                    </li>
                                ))}
                                {dropdowns && dropdowns.map((dropdown, idx) => (
                                    <li className="nav-item dropdown" key={idx}>
                                        <button id={`dropdownSubMenu${dropdown.id}`} to="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">{dropdown.text}</button>
                                        <ul aria-labelledby={`dropdownSubMenu${dropdown.id}`} className="dropdown-menu border-0 shadow">
                                            {dropdown.items && dropdown.items.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    {item.submenu ? (
                                                        <li className="dropdown-submenu dropdown-hover">
                                                            <button id={`dropdownSubMenu${item.id}`} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">{item.text}</button>
                                                            <ul aria-labelledby={`dropdownSubMenu${item.id}`} className="dropdown-menu border-0 shadow">
                                                                {item.items && item.items.map((subItem, subIndex) => (
                                                                    <React.Fragment key={subIndex}>
                                                                        {subItem.submenu ? (
                                                                            <li className="dropdown-submenu">
                                                                                <button id={`dropdownSubMenu${subItem.id}`} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">{subItem.text}</button>
                                                                                <ul aria-labelledby={`dropdownSubMenu${subItem.id}`} className="dropdown-menu border-0 shadow">
                                                                                    {subItem.items && subItem.items.map((thirdLevelItem, thirdLevelIndex) => (
                                                                                        <li key={thirdLevelIndex}><Link href={thirdLevelItem.href} className="dropdown-item">{thirdLevelItem.text}</Link></li>
                                                                                    ))}
                                                                                </ul>
                                                                            </li>
                                                                        ) : (
                                                                            <li key={subIndex}><Link href={subItem.href} className="dropdown-item">{subItem.text}</Link></li>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    ) : (
                                                        <li key={index}><Link href={item.href} className="dropdown-item">{item.text}</Link></li>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Right navbar links */}
                    <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        {rightLinks && rightLinks.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={link.href} role="button">
                                    <i className={link.iconClass} />
                                </Link>
                            </li>
                        ))}
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
                                        <small style={{ fontSize: "1rem" }}>{userData?.email}</small>
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
                        <li className="nav-item">
                            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                                <i className="fas fa-expand-arrows-alt" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* /.navbar */}
            {/* Progress bar */}
            <div className="progress" style={{ height: '5px' }}>
                <div className="progress-bar bg-success" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{ width: `${progress}%` }}>
                </div>
            </div>
            {/* /.progress */}
        </>
    )
}

export default Navbar