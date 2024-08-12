//impportaciones de react
import React, { useState } from 'react'

//recursos
import User from '../../../assets/img/user.svg';

const CurriculumV = ({
    color = "#17a2b8",
    editable = false,
    name,
    surname,
    city,
    municipality,
    address,
    colony,
    postalCode,
    phone,
    email,
    photo,
    school,
    citySchool,
    certification,
    fieldOfStudy,
    startDate,
    endDate,
    currentlyStudying,
    educationRecords
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 }); //mover y guardar la posicion de la imagen
    //funcion para determinar si el color es claro
    const isLightColor = (color) => {
        let r = parseInt(color.substr(1, 2), 16);
        let g = parseInt(color.substr(3, 2), 16);
        let b = parseInt(color.substr(5, 2), 16);
        let brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155; //si el brillo es mayor a 155, es un color claro
    };

    const textColor = isLightColor(color) ? '#000000' : '#FFFFFF'; //si el color de fondo es claro, el texto será oscuro y viceversa

    //función para obtener el valor del prop o mostrar la información por defecto
    const getDisplayValue = (value, defaultValue) => {
        if (editable) {
            // Convierte `value` a cadena antes de usar `trim()`
            return (typeof value === 'string' && value.trim() !== "") ? value : defaultValue;
        } else {
            return defaultValue;
        }
    };

    return (
        <>
            <div className="card border-3 overflow-hidden">

                <div className="row no-gutters">
                    {/* Columna Izquierda */}
                    <div className="col-sm-6 col-md-4" style={{ backgroundColor: color ? color : "#17a2b8" }}>
                        <div className="p-4 d-flex flex-column align-items-center">
                            {/* Fotografia */}
                            <div
                                className="img-container position-relative"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    overflow: "hidden",
                                    borderRadius: "50%",
                                    margin: "auto"
                                }}
                            >
                                <img
                                    src={photo || User}
                                    className="img-fluid position-absolute"
                                    alt="Foto de perfil"
                                    style={{
                                        cursor: editable ? 'pointer' : 'default',
                                        top: `${position.y}px`,
                                        left: `${position.x}px`
                                    }}
                                />
                            </div>
                            {/* Contacto */}
                            <h5 className="text-center" style={{ color: textColor }}>Contacto</h5>
                            <div style={{ color: textColor }}>
                                <p>
                                    <i className="fas fa-map-marker-alt"></i> {getDisplayValue(address, "Via Verdi 204")}, {getDisplayValue(municipality, "20100 Milán")} {getDisplayValue(postalCode, "")} {getDisplayValue(city, "")} {getDisplayValue(colony, "")}
                                </p>
                                <p>
                                    <i className="fas fa-phone"></i> {getDisplayValue(phone, "(55) 1234-5678")}
                                </p>
                                <p>
                                    <i className="fas fa-envelope"></i> {getDisplayValue(email, "hola@sitioincreible.com")}
                                </p>
                                <p>
                                    <i className="fas fa-globe"></i> www.sitioincreible.com
                                </p>
                            </div>
                        </div>

                        <h5 className="text-center" style={{ color: textColor }}>Aptitudes</h5>
                        <ul style={{ color: textColor }}>
                            <li>Liderazgo</li>
                            <li>Comunicación asertiva</li>
                            <li>Gestión de activos</li>
                            <li>Resolución de problemas</li>
                            <li>Elaboración de reportes</li>
                            <li>Trabajo en equipo</li>
                        </ul>
                    </div>

                    {/* Columna Derecha */}
                    <div className="col-sm-6 col-md-8 p-4">
                        {/* Perfil */}
                        <div className="mb-4">
                            <h5 style={{ color: color }}>{getDisplayValue(name, "Lizandro")} {getDisplayValue(surname, "Pérez")}</h5>
                            <p className="lead">Lic. en Contabilidad</p>
                            <h5 style={{ color: color }}>Acerca de mi</h5>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur harum quam doloremque ullam ratione natus quasi ipsam unde deleniti. Totam quod reiciendis esse, dignissimos sapiente dolorem. Fugiat, magnam sint.</p>
                        </div>
                        {/* The time line */}
                        <div className="timeline">
                            {/* timeline item */}
                            <div>
                                <i className="fas fa-graduation-cap bg-dark" />
                                <div className="timeline-item">
                                    <h3 className="timeline-header" style={{ color: color }}>Formación</h3>
                                    <div className="timeline-body">
                                        {/* Aqui debe de aparecer la informacion que el usuario agrega en tiempo real y la informacion que ya agrego anteriormente */}
                                        <p>
                                            <strong>{getDisplayValue(certification, "Licenciatura en Contabilidad")}</strong><br />
                                            <strong>Universidad:</strong> {getDisplayValue(school, "Universidad Alta Pinta")}, {getDisplayValue(citySchool, "Seul")} {getDisplayValue(startDate, "2010")} - {currentlyStudying ? "Actualmente estudiando" : getDisplayValue(endDate, "2014")}<br />
                                            <strong>Campo de estudio:</strong> {getDisplayValue(fieldOfStudy, "Contabilidad")}
                                        </p>
                                        {educationRecords && educationRecords.length > 0 ? (
                                            educationRecords.map((record, index) => (
                                                <div key={index}>
                                                    <p>
                                                        <strong>{record.certification}</strong><br />
                                                        <strong>Universidad:</strong> {record.school}, {record.city_school} {record.start_date} - {record.currently_studying ? "Actualmente estudiando" : record.end_date}<br />
                                                        <strong>Campo de estudio:</strong> {record.field_of_study || 'No disponible'}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No se han agregado registros de educación aún.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* END timeline item */}
                            {/* timeline item */}
                            <div>
                                <i className="fas fa-history bg-dark"></i>
                                <div className="timeline-item">
                                    <h3 className="timeline-header no-border" style={{ color: color }}>Historial Laboral</h3>
                                    <div className="timeline-body">
                                        <div className="mb-1">
                                            <p className="h6"><strong>Área de contabilidad</strong> Celaya, Seúl</p>
                                            <strong>Fecha:</strong> 2010-2012
                                            <ul>
                                                <li>Eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="h6"><strong className="mr-1">Contador Supermercado</strong> Celaya, Ciudad</p>
                                            <strong>Fecha:</strong> 2012-2014
                                            <ul>
                                                <li>Eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END timeline item */}
                            {/* timeline item */}

                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
export default CurriculumV