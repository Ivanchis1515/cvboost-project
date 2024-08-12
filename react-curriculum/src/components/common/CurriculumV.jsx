//impportaciones de react
import React from 'react'

//recursos
import User from '../../assets/img/user.svg';

const CurriculumV = ({ color }) => {
    //funcion para determinar si el color es claro
    const isLightColor = (color) => {
        let r = parseInt(color.substr(1, 2), 16);
        let g = parseInt(color.substr(3, 2), 16);
        let b = parseInt(color.substr(5, 2), 16);
        let brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155; //si el brillo es mayor a 155, es un color claro
    };

    const textColor = isLightColor(color) ? '#000000' : '#FFFFFF'; //si el color de fondo es claro, el texto será oscuro y viceversa
    const svgStyle = {
        filter: isLightColor(color) ? 'invert(0)' : 'invert(1)'
    };

    return (
        <>
            <div className="card border-3 overflow-hidden">

                <div className="row no-gutters">
                    {/* Columna Izquierda */}
                    <div className="col-sm-6 col-md-4" style={{ backgroundColor: color ? color : "#17a2b8" }}>
                        <div className="p-4 d-flex flex-column align-items-center">
                            {/* Fotografia */}
                            <img src={User} width="100%" style={svgStyle} className="img-fluid rounded-circle mb-4" alt="Foto de perfil" />
                            {/* Contacto */}
                            <div style={{ color: textColor }}>
                                <h4>Contacto</h4>
                                <p><i className="fas fa-map-marker-alt mr-1"></i>Via Verdi 204, 20100 Milán</p>
                                <p><i className="fas fa-phone-alt mr-1"></i>+32 213 12 5678</p>
                                <p><i className="fas fa-envelope-open mr-1"></i>ximena@prgmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha */}
                    <div className="col-sm-6 col-md-8 p-4">
                        {/* Perfil */}
                        <div className="mb-4">
                            <h3 style={{ color: color }}>Tu Nombre</h3>
                        </div>
                        {/* The time line */}
                        <div className="timeline">
                            {/* timeline item */}
                            <div>
                                <i className="fas fa-graduation-cap bg-dark" />
                                <div className="timeline-item">
                                    <h3 className="timeline-header" style={{ color: color }}>Formación</h3>
                                    <div className="timeline-body">
                                        <p>
                                            <strong>MBO: Servicio de estudios sociales</strong><br />
                                            <strong className="ml-1">Universidad de Celaya:</strong> - Celaya, Ciudad, 2013
                                        </p>
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
                                            <p className="h6"><strong className="mr-1">Auxiliar de cuidado geriátrico</strong>Casa de retiro - Celaya, Seúl</p>
                                            <strong>Fecha:</strong> 07/2014 - Actual
                                            <ul>
                                                <li>Reuniones con clientes y familiares para elaborar planes de formación y accionar las búsquedas de empleo.</li>
                                                <li>Puesta en marcha de un programa de integración de nuevos residentes.</li>
                                                <li>Reducción del tiempo de formación de cuatro a dos semanas.</li>
                                                <li>Asistencia en el desarrollo de cuidados necesarios según las necesidades de los pacientes.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="h6"><strong className="mr-1">Auxiliar de cuidado</strong>Casa de retiro ideales - Celaya, Ciudad</p>
                                            <strong>Fecha:</strong> 09/2010 - 06/2014
                                            <ul>
                                                <li>Conexión de manera cálida y con carisma con cada cliente para ofrecer el mejor cuidado posible.</li>
                                                <li>Mejorar significativamente la condición del paciente y su vida diaria mediante un cuidado compasivo.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END timeline item */}
                            {/* timeline item */}
                            <div>
                                {/* Aptitudes */}
                                <i className="fas fa-user-cog bg-dark"></i>
                                <div className="timeline-item">
                                    <h3 className="timeline-header" style={{ color: color }}>Aptitudes</h3>
                                    <div className="timeline-body">
                                        <ul>
                                            <li>Buena comunicación verbal</li>
                                            <li>Atención al detalle</li>
                                            <li>Actividades comunitarias</li>
                                            <li>Manejo de situaciones críticas</li>
                                            <li>Seguridad del paciente y primeros auxilios</li>
                                            <li>Atención compasiva y paciente</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
export default CurriculumV