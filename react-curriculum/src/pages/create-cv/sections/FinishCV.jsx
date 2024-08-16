//importaciones de react
import React, { useState, useContext, lazy, Suspense, useEffect } from 'react';

//navegacion entre paginas
import { Link, useNavigate } from 'react-router-dom';

//contexto de pagina
import { curriculumContext } from '../../../context/curriculumContext';

//layouts
import Preloader from '../../../components/common/Preloader';
import Navbar from '../../../components/layout/navbar/Navbar';
import PageHeader from '../../../components/layout/PageHeader';
import AsideBarOr from '../../../components/layout/AsideBarOr';
import Footer from '../../../components/layout/Footer';

//commons
//configuracion de plantillas
import { templates } from '../../../utils/plantillasConfig';
import { showErrorToast } from '../../../components/common/SweetAlert2';
import ColorPicker from '../../../components/common/ColorPicker';

//helper
import { ObtenerSections, obtenerData } from '../../../utils/curriculums/curriculums';
import { formatCVData } from '../../../utils/curriculums/dataTransformer';
import downloadPDF from '../../../helpers/pdfHelper';

const FinishCV = () => {
    //variables globales para el contexto (retoma la plantilla y el color elegidos) anteriormente
    const { userData, selectedTemplate, selectedColor, setSelectedTemplate, setSelectedColor } = useContext(curriculumContext);
    //obten el id del cv modificado actualmente
    const idcv_usertemplate = localStorage.getItem("cv_id");

    const [TemplateComponent, setTemplateComponent] = useState(null); //componente de la plantilla
    const [color, setColor] = useState(selectedColor);//color de la plantilla
    //filtra las plantillas exluyendo la que fue seleccionada
    const filteredTemplates = Object.keys(templates).filter(templateName => templateName !== selectedTemplate);
    const [isLoading, setIsLoading] = useState(true); //carga del preloader
    const [completedSections, setCompletedSections] = useState([]); //secciones completadas
    const [userDataFromSections, setUserDataFromSections] = useState({}); //datos de las secciones

    //funcion para cambiar de plantilla
    const handleChangeTemplate = (templateName) => {
        //actualiza la variable de la plantilla
        setSelectedTemplate(templateName);
        //guardala en el localStorage
        localStorage.setItem('selectedTemplate', templateName);
        //actualiza la variable del color
        setSelectedColor(color);
        //guardala en el localstorage
        localStorage.setItem('selectedColor', color);
    };

    //colores disponibles
    const colors = ["#6c757d", "#17a2b8", "#28a745", "#ffc107", "#01ff70", "#e83e8c", "#343a40"];
    const selectResume = (color) => {
        //actualiza el estado del color
        setColor(color);
    };

    useEffect(() => {
        //funcion para cargar el componente de la plantilla
        const loadComponent = async () => {
            //verifica que exista el componente que se eligio
            if (templates[selectedTemplate]) {
                //si existe guarda la ruta y el componente
                const { component } = templates[selectedTemplate];
                const Component = lazy(component);
                //actualiza el componente plantilla
                setTemplateComponent(() => Component);
            }
        };
        loadComponent();
    }, [selectedTemplate]);

    useEffect(() => {
        const fetchCVData = async () => {
            setIsLoading(true);
            try {
                //consulta las secciones completadas
                const sectionsResponse = await ObtenerSections(idcv_usertemplate); //id de la plantilla actual
                if (sectionsResponse.status === 200) {
                    setCompletedSections(sectionsResponse.data); //asigna el resultado a una variable
                } else {
                    showInfoToast("Ocurrió un problema con la consulta de secciones: " + sectionsResponse.message);
                }

                const response = await obtenerData(idcv_usertemplate);
                if(response.status === 200){
                    const formattedData = formatCVData(response.data);
                    setUserDataFromSections(formattedData);
                    setIsLoading(false);
                } else{
                    showErrorToast(response.error);
                }
            } catch (error) {
                showErrorToast('Error fetching CV data: '+ error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCVData();
    }, [idcv_usertemplate]);

    return (
        <div className="layout-top-nav layout-navbar-fixed layout-footer-fixed sidebar-collapse sidebar-mini">
            {/* Preloader */}
            {isLoading && <Preloader setIsLoading={setIsLoading} />}
            {/* Preloader */}

            {/* Navbar */}
            <Navbar brandText="CvBoost" userData={userData} />
            {/* Navbar */}

            {/* <!-- Main Sidebar Container --> */}
            <AsideBarOr completedSections={completedSections} activeSection="finish" userData={userData} />
            {/* ./main sidebar */}

            {/* Content wrapper */}
            <div className="content-wrapper ml-0">
                {/* Page header */}
                <PageHeader
                    title="Curriculum vitae >"
                    subtitle="Finalizar"
                    breadcrumbs={[
                        { label: "Encabezado CV", href: "/create-csv/section/headerCV" },
                        { label: "Estudios CV", href: "/create-csv/section/studies" },
                        { label: "Experiencia laboral", href: "/create-csv/section/workhistory" },
                        { label: "Aptitudes CV", href: "create-csv/section/skills" },
                        { label: "Idiomas", href: "create-csv/section/languages" },
                        { label: "Finalizar CV", to: true }
                    ]}
                />
                {/* ./Page header */}

                {/* content */}
                <div className="content">
                    {/* Main content */}
                    <div className="container">
                        {/* row */}
                        <div className="row justify-content-center align-items-center">
                            {/* modal */}
                            <div className="modal fade show" id="modalTemplate" style={{ display: 'none' }} aria-modal="true" role="dialog">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Cambiar plantilla</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="card card-outline card-success" style={{ height: 'auto', overflowY: 'scroll' }}>
                                                        <div className="card-header">
                                                            <h3 className="card-title">Vista previa</h3>
                                                        </div>
                                                        <div className="card-body">
                                                            {/* Plantilla actual */}
                                                            <Suspense fallback={<div>Cargando plantilla...</div>}>
                                                                {TemplateComponent ? (
                                                                    <TemplateComponent

                                                                        color={selectedColor}
                                                                        editable={true}
                                                                    />
                                                                ) : (
                                                                    <p>No se ha seleccionado ninguna plantilla.</p>
                                                                )}
                                                            </Suspense>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-7">
                                                    <p className="lead">Colores:</p>
                                                    <ColorPicker onSelect={selectResume} colors={colors} />
                                                    <div className="row mt-3">
                                                        {/* Plantillas disponibles */}
                                                        {filteredTemplates.map(templateName => {
                                                            const TemplateOptionComponent = React.lazy(templates[templateName].component);
                                                            return (
                                                                <div className="col-md-12" key={templateName}>
                                                                    <div className="card card-outline card-success" style={{ cursor: 'pointer' }} onClick={() => handleChangeTemplate(templateName)}>
                                                                        <div className="card-header">
                                                                            <h3 className="card-title">{templates[templateName].label}</h3>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <Suspense fallback={<div>Cargando plantilla...</div>}>
                                                                                <TemplateOptionComponent
                                                                                    color={color}
                                                                                    editable={false}
                                                                                />
                                                                            </Suspense>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer justify-content-between">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ./modal */}

                            {/* Alert */}
                            <div className="alert alert-success alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-check" />¡Enhorabuena!</h5>                                
                                Haz concluido tu Curriculum Vitae, visualizalo para verificar que no se te pase ningun dato.
                                Luego descargalo y envialo a tus reclutadores ¡Buena suerte!
                            </div>
                            {/* ./alert */}

                            {/* Preview */}
                            <div className="col-md-6">
                                <div className="card card-outline card-success" style={{ height: '600px', overflowY: 'scroll' }}>
                                    <div className="card-header">
                                        <h3 className="card-title">Vista previa</h3>
                                        <button className="btn float-right" data-toggle="modal" data-target="#modalTemplate">
                                            Personalizar <i className="fas fa-palette" />
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <Suspense fallback={<div>Cargando plantilla...</div>}>
                                            {TemplateComponent ? (
                                                <div id="cvContent">
                                                    <TemplateComponent
                                                        color={selectedColor}
                                                        editable={true}
                                                        {...userDataFromSections} //pasar todos los datos como propiedades
                                                    />
                                                </div>
                                            ) : (
                                                <p>No se ha seleccionado ninguna plantilla.</p>
                                            )}
                                        </Suspense>
                                    </div>
                                </div>
                                <div className="mt-3 text-center">
                                    <button 
                                        className="btn btn-primary mr-2" 
                                        onClick={() => {
                                            const content = document.getElementById('cvContent'); //ID del contenido a exportar
                                            const name = userData?.full_name || 'Usuario'; //usa el nombre del usuario o 'Usuario' por defecto
                                            const format = "letter"
                                            downloadPDF(content, format, name);
                                        }}
                                    >
                                        Descargar en formato Carta
                                    </button>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => {
                                            const content = document.getElementById('cvContent'); //ID del contenido a exportar
                                            const name = userData?.full_name || 'Usuario'; //usa el nombre del usuario o 'Usuario' por defecto
                                            const format = "A4"
                                            downloadPDF(content, format, name);
                                        }}
                                    >
                                        Descargar en formato A4
                                    </button>
                                </div>
                                <div className="mt-3 text-center">
                                    <Link to="/" className="btn btn-primary" onClick={() => {
                                            localStorage.removeItem('selectedColor');
                                            localStorage.removeItem('cv_id');
                                            localStorage.removeItem('selectedTemplate');
                                        }}
                                    >
                                        Continuar y guardar
                                    </Link>
                                </div>
                            </div>
                            {/* ./preview */}
                        </div>
                        {/* ./row */}
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

export default FinishCV