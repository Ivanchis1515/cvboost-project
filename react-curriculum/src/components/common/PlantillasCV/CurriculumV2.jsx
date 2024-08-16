//importaciones de react
import React, { useState } from 'react';

//recursos
import User from '../../../assets/img/user.svg';

const CurriculumV2 = ({
    color = "#17a2b8",
    editable = false,
    name, //datos personales
    surname,
    ocupation,
    personalDescription,
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
    //funcion para obtener un color mas suave
    const lightenColor = (color, percent) => {
        let num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return `#${(
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1)}`;
    };

    // Función para determinar si el color es claro
    const isLightColor = (color) => {
        let r = parseInt(color.substr(1, 2), 16);
        let g = parseInt(color.substr(3, 2), 16);
        let b = parseInt(color.substr(5, 2), 16);
        let brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155; // Si el brillo es mayor a 155, es un color claro
    };

    const lightColor = lightenColor(color, 0);
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

                <div className="row no-gutters align-items-center justify-content-center" style={{ backgroundColor: color === "" ? "#17a2b8" : lightColor }}>
                    {/* Columna izquierda */}
                    <div className="col-md-4 col-sm-6 col-lg-4" style={{ backgroundColor: color }}>
                        <div className="text-center p-4">
                            {/* Fotografía */}
                            <div
                                className="img-container position-relative"
                                style={{
                                    width: "130px",
                                    height: "130px",
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
                        </div>
                    </div>
                    {/* Columna derecha */}
                    <div className="col-md-8 col-sm-6 p-4">
                        <div style={{ color: textColor }}>
                            <h2 className="font-weight-bold">{getDisplayValue(name, "Lizandro")} {getDisplayValue(surname, "Pérez")}</h2>
                            <p className="lead">{getDisplayValue(ocupation, "Lic. en Contabilidad")}</p>
                            {getDisplayValue(personalDescription, "Soy una persona dedicada, con muchas ganas de sobresalir")}
                        </div>
                    </div>
                </div>

                {/* informacion */}
                <div className="row">
                    {/* columna izquierda */}
                    <div className="col-md-4 col-sm-6" style={{ backgroundColor: color === "" ? "#17a2b8" : lightColor }}>
                        <hr />
                        {/* Contacto */}
                        <h5 className="text-center" style={{ color: textColor }}>Contacto</h5>
                        <div className="ml-1" style={{ color: textColor }}>
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

                        {/* Aptitudes */}
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
                                        <div className="col-12 mb-3 ml-0" key={index}>
                                            <div className="d-flex justify-content-between align-items-center bg-light p-1 rounded elevation-3">
                                                <span className="font-weight-bold">{record.language}</span>
                                                <span>{getLevelText(record.level)}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    languages && languages.length > 0 ? (
                                        languages.map((record, index) => (
                                            <div className="col-12 mb-3 ml-0" key={index}>
                                                <div className="d-flex justify-content-between align-items-center bg-light p-1 rounded elevation-3">
                                                    <span className="font-weight-bold">{record.name}</span>
                                                    <span>{getLevelText(record.level)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="col-12 text-center ml- mb-1">
                                                <div className="d-flex justify-content-between align-items-center bg-light p-1 rounded elevation-3">
                                                    <span className="font-weight-bold">Francés</span>
                                                    <span>Intermedio</span>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center ml-0 mb-1">
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
                    <div className="col-md-8 col-sm-6 p-4">
                        {/* Formación */}
                        <div className="">
                            <h5>Formación</h5>
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
                        <hr />
                        {/* Historial Laboral */}
                        <div>
                            <h5>Historial Laboral</h5>
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
                                                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptatum odio, excepturi autem ipsa eaque, libero quae officiis corrupti architecto pariatur? Maxime explicabo architecto quasi temporibus, eligendi at ab error.</li>
                                            )}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default CurriculumV2