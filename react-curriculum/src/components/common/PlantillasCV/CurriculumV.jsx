//impportaciones de react
import React, { useState } from 'react'

//commons
import Slider from '../Slider';

//recursos
import User from '../../../assets/img/user.svg';

const CurriculumV = ({
    color = "#17a2b8",
    editable = false,
    name, //datos personales
    surname,
    city,
    municipality,
    address,
    colony,
    postalCode,
    phone,
    email,
    photo,
    school, //datos academicos
    citySchool,
    certification,
    fieldOfStudy,
    startDate,
    endDate,
    currentlyStudying,
    educationRecords, //array de objetos de educacion
    position, //datos laborales
    company,
    workCity,
    workMunicipality,
    workStartDate,
    workEndDate,
    currentlyWorking,
    Workactivities,
    workRecords, //array de objetos de experiencia laboral
    skills, //aptitudes
    skillsRecords, //array de objetos de aptitudes de usuario
    languages,//lenguajes
    languageRecords //array de objetos de lenguajes
}) => {
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 }); //mover y guardar la posicion de la imagen
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

    //funcion para obtener el texto del nivel basado en el valor del slider
    const getLevelText = (value) => {
        switch (value) {
            case 1:
                return 'Principiante';
            case 2:
                return 'Básico';
            case 3:
                return 'Intermedio';
            case 4:
                return 'Avanzado';
            case 5:
                return 'Muy avanzado';
            default:
                return '';
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

                                        top: `${imagePosition.y}px`,
                                        left: `${imagePosition.x}px`
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
                                {/* <p>
                                    <i className="fas fa-globe"></i> www.sitioincreible.com
                                </p> */}
                            </div>
                        </div>

                        <h5 className="text-center" style={{ color: textColor }}>Aptitudes</h5>
                        <ul style={{ color: textColor }}>
                            {skillsRecords && skillsRecords.length > 0 ? (
                                skillsRecords.map((record, index) => (
                                    <li key={index}>
                                        {getDisplayValue(record.skill_name, "liderazgo")}
                                    </li>
                                ))
                            ) : (
                                skills && skills.length > 0 ? (
                                    skills.map((skill, index) => (
                                        <li key={index}>
                                            {getDisplayValue(skill.name, "liderazgo")}
                                        </li>
                                    ))
                                ) : (
                                    <>
                                        <li>Liderazgo</li>
                                        <li>Trabajo en equipo</li>
                                        <li>Responsable</li>
                                        <li>Ágil</li>
                                    </>
                                )
                            )}
                        </ul>
                        <h5 className="text-center" style={{ color: textColor }}>Idiomas</h5>
                        <div className="container">
                            <div className="row">
                                {languageRecords && languageRecords.length > 0 ? (
                                    languageRecords.map((record, index) => (
                                        <div className="col-12 mb-3 ml-1" key={index}>
                                            <div className="d-flex justify-content-between align-items-center bg-light p-1 rounded elevation-3">
                                                <span className="font-weight-bold">{record.language}</span>
                                                <span>{getLevelText(record.level)}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    languages && languages.length > 0 ? (
                                        languages.map((record, index) => (
                                            <div className="col-12 mb-3 ml-1" key={index}>
                                                <div className="d-flex justify-content-between align-items-center bg-light p-1 rounded elevation-3">
                                                    <span className="font-weight-bold">{record.name}</span>
                                                    <span>{getLevelText(record.level)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="col-12 text-center ml-1 mb-1">
                                                <div className="d-flex justify-content-between align-items-center bg-light p-1 rounded elevation-3">
                                                    <span className="font-weight-bold">Francés</span>
                                                    <span>Intermedio</span>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center ml-1 mb-1">
                                                <div className="d-flex justify-content-between align-items-center bg-light p-1 rounded elevation-3">
                                                    <span className="font-weight-bold">Inglés</span>
                                                    <span>Avanzado</span>
                                                </div>
                                            </div>
                                        </>
                                    )
                                )}
                            </div>
                        </div>
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
                                            <>
                                                <p>
                                                    <strong>{getDisplayValue(certification, "Licenciatura en Contabilidad")}</strong><br />
                                                    <strong>Universidad:</strong> {getDisplayValue(school, "Universidad Alta Pinta")}, {getDisplayValue(citySchool, "Seul")} {getDisplayValue(startDate, "2010")} - {currentlyStudying ? "Actualmente estudiando" : getDisplayValue(endDate, "2014")}<br />
                                                    <strong>Campo de estudio:</strong> {getDisplayValue(fieldOfStudy, "Contabilidad")}
                                                </p>
                                            </>
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
                                        {/* Mostrar los registros laborales guardados */}
                                        {workRecords && workRecords.length > 0 ? (
                                            workRecords.map((record, index) => (
                                                <div key={index}>
                                                    <p className="h6">
                                                        <strong>{record.position}</strong> - {record.company}, {record.city}, {record.municipality}
                                                    </p>
                                                    <strong>Fecha:</strong> {record.startDate} - {record.currentlyWorking ? "Actualmente trabajando aquí" : record.endDate}
                                                    <ul>
                                                        {record.activities && record.activities.length > 0 ? (
                                                            record.activities.map((activity, idx) => (
                                                                <li key={idx}>{activity}</li>
                                                            ))
                                                        ) : (
                                                            <li></li>
                                                        )}
                                                    </ul>
                                                </div>
                                            ))
                                        ) : (
                                            <>
                                                <div className="mb-1">
                                                    <p className="h6"><strong>{getDisplayValue(company, "SuperSu")} - {getDisplayValue(position, "Área de contabilidad")}</strong> {getDisplayValue(workCity, "Celaya")}, {getDisplayValue(workMunicipality, "Seúl")}</p>
                                                    <strong>Fecha:</strong> {getDisplayValue(workStartDate, "2010")} - {currentlyWorking ? "Actualmente" : getDisplayValue(workEndDate, "2012")}
                                                    <ul>
                                                        {Workactivities && Workactivities.length > 0 ? (
                                                            Workactivities.map((activity, index) => (
                                                                <li key={index}>{activity || 'Eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc.'}</li>
                                                            ))
                                                        ) : (
                                                            <li>asdasd</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </>
                                        )}
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