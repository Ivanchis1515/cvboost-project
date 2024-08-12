//importaciones de react
import React, { useState } from 'react';

//recursos
import User from '../../assets/img/user.svg';

const CurriculumV2 = ({ 
    color,
    editable = false, 
    name
}) => {
    //estado para la imagen de perfil
    const [profileImage, setProfileImage] = useState(User);
    const [position, setPosition] = useState({ x: 0, y: 0 }); //mover y guardar la posicion de la imagen

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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setProfileImage(e.target.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    

    //función para obtener el valor del prop o mostrar la información por defecto
    const getDisplayValue = (value, defaultValue) => { //recibe el valor de la prop y el valor por defecto
        if (editable) {
            //si el documento esta editable
            return value && value.trim() !== "" ? value : defaultValue;
        } else {
            //sino retorna el valor por defecto
            return defaultValue;
        }
    };

    return (
        <>
            <div className="card border-3 overflow-hidden">

                <div className="row no-gutters align-items-center justify-content-center" style={{ backgroundColor: color === "" ? "#17a2b8" : lightColor }}>
                    {/* Columna izquierda */}
                    <div className="col-md-4 col-sm-6" style={{ backgroundColor: color }}>
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
                                    src={profileImage}
                                    className="img-fluid position-absolute"
                                    alt="Foto de perfil"
                                    onClick={() => editable && document.getElementById('fileInput').click()}
                                    style={{
                                        cursor: editable ? 'pointer' : 'default',
                                        top: `${position.y}px`,
                                        left: `${position.x}px`
                                    }}
                                />
                            </div>
                            {/* Input de archivo oculto */}
                            {editable && (
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            )}
                        </div>
                    </div>
                    {/* Columna derecha */}
                    <div className="col-md-8 col-sm-6 p-4">
                        <div style={{ color: textColor }}>
                            <h1 className="font-weight-bold">{getDisplayValue(name, "Lizandro Pérez")}</h1>
                            {/* <h1 className="font-weight-bold">Lizandro Pérez</h1> */}
                            <p>Lic. en Contabilidad</p>
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
                        <div className="ml-2" style={{ color: textColor }}>
                            <p><i className="fas fa-map-marker-alt"></i> Via Verdi 204, 20100 Milán</p>
                            <p><i className="fas fa-phone"></i> (55) 1234-5678</p>
                            <p><i className="fas fa-envelope"></i> hola@sitioincreible.com</p>
                            <p><i className="fas fa-globe"></i> www.sitioincreible.com</p>
                        </div>

                        {/* Aptitudes */}
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
                    <div className="col-md-8 col-sm-6 p-4">
                        {/* Formación */}
                        <div className="">
                            <h5>Formación</h5>
                            <p>
                                <strong>Licenciatura en Contabilidad</strong><br />
                                <strong>Universidad:</strong> Universidad Alta Pinta 2010-2014
                            </p>
                            <p>
                                <strong>Diplomado en finanzas</strong><br />
                                <strong>Universidad:</strong> Universidad Alta Pinta 2014-2016
                            </p>
                        </div>
                        <hr />
                        {/* Historial Laboral */}
                        <div>
                            <h5>Historial Laboral</h5>
                            <div className="ml-0">
                                <p>
                                    <strong>Área de contabilidad</strong><br />
                                    Empresa Borcelle<br />
                                    Fecha: 2010-2012
                                </p>
                                <ul>
                                    <li>Eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc.</li>
                                </ul>
                            </div>
                            <div>
                                <p>
                                    <strong>Contador Supermercado</strong><br />
                                    Empresa Borcelle<br />
                                    Fecha: 2012-2014
                                </p>
                                <ul>
                                    <li>Eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc.</li>
                                </ul>
                            </div>
                            <div>
                                <p>
                                    <strong>Auxiliar Contador</strong><br />
                                    Empresa Borcelle<br />
                                    Fecha: 2014-2016
                                </p>
                                <ul>
                                    <li>Eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default CurriculumV2