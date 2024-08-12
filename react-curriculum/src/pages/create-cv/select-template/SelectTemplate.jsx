//importaciones de react
import React, { useContext, useState, useEffect, Suspense, lazy, memo } from 'react';

//navegacion entre paginas
import { Link, useNavigate, useLocation } from 'react-router-dom';

//importacion del contexto de aplicacion 
import { curriculumContext } from '../../../context/curriculumContext';

//commons
import ColorPicker from '../../../components/common/ColorPicker';
import { templates } from '../../../utils/plantillasConfig';

//layouts
import Navbar from '../../../components/layout/navbar/Navbar';
import Footer from '../../../components/layout/Footer';

//utils
import { crearCV, obtenerCV } from '../../../utils/curriculums/curriculums';

//objeto de plantillas para renderizar


const SelectTemplate = () => {
    const location = useLocation(); //Obtiene variables del estado de la navegacion
    const { experience, isStudent } = location.state || {}; //variables de otra pagina

    //navegacion programatica desde el codigo
    const navigate = useNavigate();
    const [components, setComponents] = useState({});//estado para componentes cargados dinamicamente
    const { userData, setSelectedTemplate, selectedColor, setSelectedColor } = useContext(curriculumContext); //variables globales

    //colores para el color-picker
    const colors = ["#6c757d", "#17a2b8", "#28a745", "#ffc107", "#01ff70", "#e83e8c", "#343a40"];

    const selectResume = (color) => {
        setSelectedColor(color);
        localStorage.setItem('selectedColor', color);
    };

    const handleSelectTemplate = async (templateName) => {
        try {
            const user_id = userData.id; //extrae el id del usuario de sus datos
            const cv = await obtenerCV(templateName); //consulta la informacion de la plantilla seleccionada
            if (cv && cv.status === 200) {
                const response = await crearCV(user_id, cv.data.id, templateName, selectedColor) //guarda la informacion para comenzar a modificar
                if (response.status === 200) {
                    setSelectedTemplate(templateName);
                    localStorage.setItem('selectedTemplate', templateName);
                    localStorage.setItem('cv_id', response.data.id); //almacena el id
                    navigate('/create-csv/section/headerCV');
                }
            }
        } catch (error) {
            console.error('Error al conectar con el backend:', error);
        }
    };

    //cargar componentes dinámicamente
    useEffect(() => {
        const loadComponents = async () => {
            const loadedComponents = {}; //objetos de componentes
            for (const [key, value] of Object.entries(templates)) { //para cada llave y valor de la lista de templates
                loadedComponents[key] = lazy(value.component); //cargalos lentamente
            }
            setComponents(loadedComponents); //actualiza los componentes cargados
        };

        loadComponents();
    }, []);

    //carta generica
    const TemplateCard = memo(({ templateKey, Component }) => (
        <div className="col-md-6 mb-4">
            <Suspense fallback={<div>Loading...</div>}>
                <Component color={selectedColor} />
            </Suspense>
            <button
                className="btn btn-success mt-2"
                onClick={() => handleSelectTemplate(templateKey)}
            >
                Seleccionar
            </button>

        </div>
    ));

    return (
        <div className="layout-top-nav">
            {/* Navbar */}
            <Navbar
                brandText="CvBoost"
                userData={userData}
                progress={66}
            />
            {/* Navbar */}
            {/* Conten wrapper */}
            <div className="content-wrapper ml-0">
                {/* content */}
                <div className="content">
                    {/* Main content */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3 col-md-3" style={{ marginTop: "145px" }}>
                                <hr className="" />
                                <div className="card card-outline card-success sticky-top">
                                    <div className="card-header">
                                        <h3 className="card-title">Filtros</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Años de experiencia</label>
                                            <select className="form-control">
                                                <option>{experience === 'none' ? 'Ninguna experiencia' : experience + ' años'}</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Colores</label>
                                            <ColorPicker onSelect={selectResume} colors={colors} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9 col-md-9">
                                {experience === 'none' || experience === '0-3' ? (
                                    isStudent ? (
                                        <>
                                            <h2 className="mt-5"><b className="text-danger mr-1">Estudiante:</b> elige un CV de nuestras sugerencias</h2>
                                            <p className="h6 mb-5">Encontraremos las mejores plantillas para tu nivel de experiencia.</p>
                                            <hr />
                                            <div className="row">
                                                {Object.entries(components).map(([key, Component]) => (
                                                    <TemplateCard key={key} templateKey={key} Component={Component} />
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="mt-5"><b className="text-danger mr-1">{experience === 'none' ? 'Sin experiencia:' : 'De ' + experience + ' años:'}</b>¿Cómo quieres que luzca tu CV?</h2>
                                            <p className="h6 mb-5">Selecciona el CV más adecuado a tus gustos.</p>
                                            <hr />
                                            <div className="row">
                                                {Object.entries(components).map(([key, Component]) => (
                                                    <TemplateCard key={key} templateKey={key} Component={Component} />
                                                ))}
                                            </div>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <h2 className="mt-5">¿Cómo quieres que luzca tu CV?</h2>
                                        <p className="h6 mb-5">Selecciona el CV más adecuado a tus gustos.</p>
                                        <hr />
                                        <div className="row">
                                            {Object.entries(components).map(([key, Component]) => (
                                                <TemplateCard key={key} templateKey={key} Component={Component} />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ./Main content */}
                </div>
                {/* ./content */}
            </div>
            {/* ./content-wrapper */}
            {/* Footer */}
            <Footer />
            {/* Footer */}
        </div>
    )
}

export default SelectTemplate