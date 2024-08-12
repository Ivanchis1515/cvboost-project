//importaciones de react
import React from 'react'

//navegacion entre paginas
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            {/* Main Footer */}
            <footer className="main-footer m-0">
                {/* To the right */}
                <div className="float-right d-none d-sm-inline">
                    Version 1.0.0
                </div>
                {/* Default to the left */}
                <strong>Copyright © 2024-2024 <Link to="/">CvBoost</Link>.</strong> All rights reserved.
            </footer>
        </>
    )
}

export default Footer;