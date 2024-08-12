//importaciones de react
import React from 'react';

//navegacion entre paginas
import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, breadcrumbs }) => {
    return (
        <>
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0"> { title } <small>{ subtitle }</small></h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <li 
                                        key={index} 
                                        className={`breadcrumb-item ${breadcrumb.active ? 'active' : ''}`}
                                    >
                                        {breadcrumb.href ? (
                                            <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
                                        ) : (
                                            breadcrumb.label
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
        </>
    )
}

export default PageHeader