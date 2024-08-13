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
import ColorPicker from '../../../components/common/ColorPicker';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../../components/common/SweetAlert2';
//configuracion de plantillas
import { templates } from '../../../utils/plantillasConfig';

//helpers
import { guardarExperiencia } from '../../../utils/curriculums/curriculums';

const WorkhistoryCV = () => {
    //variables globales para el contexto (retoma la plantilla y el color elegidos) anteriormente
    const { userData, selectedTemplate, selectedColor, setSelectedTemplate, setSelectedColor } = useContext(curriculumContext);
    //obten el id del cv modificado actualmente
    const idcv_usertemplate = localStorage.getItem("cv_id");

    const [TemplateComponent, setTemplateComponent] = useState(null); //componente de la plantilla
    const [color, setColor] = useState(selectedColor);//color de la plantilla
    //colores disponibles
    const colors = ["#6c757d", "#17a2b8", "#28a745", "#ffc107", "#01ff70", "#e83e8c", "#343a40"];
    const selectResume = (color) => {
        //actualiza el estado del color
        setColor(color);
    };
    //filtra las plantillas exluyendo la que fue seleccionada
    const filteredTemplates = Object.keys(templates).filter(templateName => templateName !== selectedTemplate);
    const [isLoading, setIsLoading] = useState(true); //carga del preloader 
    //formdata formulario
    const [formData, setFormData] = useState({
        position: '',
        company: '',
        workCity: '',
        workMunicipality: '',
        workStartDate: '',
        workEndDate: '',
        currentlyWorking: false,
        Workactivities: [''] // lista inicial con un campo vacio
    });

    //cambio en el formdata
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const [workRecords, setworkRecords] = useState([]); //array de elementos extraidos
    const [editId, setEditId] = useState(null); //id seleccionado
    const [completedSections, setCompletedSections] = useState([]); //secciones completadas
    const [userDataFromSections, setUserDataFromSections] = useState({}); //datos de las secciones

    const handleAddRecord = async () => {
        const hasFormData = Object.values(formData).some(value => value !== '' && value !== false); //verifica si el formulario tiene datos
        if (!hasFormData) {
            showInfoToast('Por favor, completa los campos del formulario para agregar un campo de estudio.');
            return; //no enviar datos si el formulario esta vacio
        }

        try {
            const dataToSubmit = {
                cvid_user_template: idcv_usertemplate,
                user_id: userData?.id,
                ...formData,
                currentlyWorking: formData.currentlyWorking ? 1 : 0,  //conversion a tinyint
                workEndDate: formData.currentlyWorking ? null : formData.workEndDate,
            };

            //envia los datos al endpoint
            const response = await guardarExperiencia(dataToSubmit);
            if (response.status === 200 && response.data.content) {
                //agregar el nuevo registro al estado
                setworkRecords(prevRecords => [response.data.content, ...prevRecords]);
                //limpiar el formulario después de enviar los datos
                setFormData({
                    position: '',
                    company: '',
                    workCity: '',
                    workMunicipality: '',
                    workStartDate: '',
                    workEndDate: '',
                    currentlyWorking: false,
                    Workactivities: [''] // lista inicial con un campo vacio
                });
                showSuccessToast(response.data.message);
            } else {
                showErrorToast('Error en la respuesta del servidor.');
            }
        } catch (error) {
            showErrorToast('Error al agregar el registro');
        }
    };

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
    return (
        <div className="layout-top-nav layout-navbar-fixed layout-footer-fixed sidebar-collapse sidebar-mini">
            {/* Preloader */}
            {isLoading && <Preloader setIsLoading={setIsLoading} />}
            {/* Preloader */}

            {/* Navbar */}
            <Navbar brandText="CvBoost" userData={userData} />
            {/* Navbar */}

            {/* <!-- Main Sidebar Container --> */}
            <AsideBarOr completedSections={completedSections} activeSection="workhistory" userData={userData} />
            {/* ./main sidebar */}

            {/* Content wrapper */}
            <div className="content-wrapper ml-0">
                {/* Page header */}
                <PageHeader
                    title="Curriculum vitae >"
                    subtitle="Experiencia laboral"
                    breadcrumbs={[
                        { label: "Inicio", href: "/" },
                        { label: "Plantillas", href: "/create-csv/select-template" },
                        { label: "Encabezado CV", href: "/create-csv/section/headerCV" },
                        { label: "Estudios CV", active: true }
                    ]}
                />
                {/* ./Page header */}

                {/* content */}
                <div className="content">
                    {/* Main content */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
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
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Atención!</h5>
                                <p style={{ fontSize: '0.9rem' }}>
                                    Los reclutadores ojean el CV durante seis segundos para decidir tu idoneidad. Te sugeriremos propongas tus actividades que te hicieron hagan destacar.
                                </p>
                            </div>
                            {/* ./alert */}

                            {/* Form */}
                            <div className="col-md-7">
                                <div className="card card-success">
                                    <div className="card-header">
                                        <h3 className="card-title">Cuentanos sobre tu experiencia trabajando</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="card-body">
                                                <div className="row">
                                                    <p className="">Comienza con el trabajo más reciente y continúa en orden regresivo.</p>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="position">Cargo:</label>
                                                            <input
                                                                type="text"
                                                                id="position"
                                                                className="form-control"
                                                                placeholder="Nombre del cargo"
                                                                value={formData.position || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="company">Empresa:</label>
                                                            <input
                                                                type="text"
                                                                id="company"
                                                                className="form-control"
                                                                placeholder="Nombre de la empresa"
                                                                value={formData.company || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="city">Ciudad localidad:</label>
                                                            <input
                                                                type="text"
                                                                id="workCity"
                                                                className="form-control"
                                                                placeholder="Ciudad localidad"
                                                                value={formData.workCity || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="municipality">Alcaldía/municipio:</label>
                                                            <input
                                                                type="text"
                                                                id="workMunicipality"
                                                                className="form-control"
                                                                placeholder="Alcaldía/municipio"
                                                                value={formData.workMunicipality || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="startDate">Fecha de inicio</label>
                                                            <input
                                                                type="date"
                                                                id="workStartDate"
                                                                className="form-control"
                                                                value={formData.workStartDate || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="endDate">Fecha de finalización</label>
                                                            <input
                                                                type="date"
                                                                id="workEndDate"
                                                                className="form-control"
                                                                value={formData.currentlyWorking ? '' : formData.workEndDate || ''}
                                                                onChange={handleChange}
                                                                disabled={formData.currentlyWorking}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 text-right">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                id="currentlyWorking"
                                                                className="form-check-input"
                                                                checked={formData.currentlyWorking}
                                                                onChange={handleChange}
                                                            />
                                                            <label htmlFor="currentlyWorking" className="form-check-label">
                                                                Actualmente sigo trabajando aquí
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="Workactivities">Actividades:</label>
                                                        {formData.Workactivities.map((activity, index) => (
                                                            <div key={index} className="input-group mb-2">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Descripción de actividad"
                                                                    value={activity}
                                                                    onChange={(e) => {
                                                                        const newActivities = [...formData.Workactivities];
                                                                        newActivities[index] = e.target.value;
                                                                        setFormData(prevData => ({
                                                                            ...prevData,
                                                                            Workactivities: newActivities
                                                                        }));
                                                                    }}
                                                                />
                                                                <div className="input-group-append">
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setFormData(prevData => ({
                                                                                ...prevData,
                                                                                Workactivities: prevData.Workactivities.filter((_, i) => i !== index)
                                                                            }));
                                                                        }}
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button
                                                            className="btn btn-primary"
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prevData => ({
                                                                    ...prevData,
                                                                    Workactivities: [...prevData.Workactivities, '']
                                                                }));
                                                            }}
                                                        >
                                                            Añadir actividad
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-success float-right">
                                            Siguiente
                                        </button>
                                        {editId ? (
                                            <button className="btn btn-success float-right mr-2">
                                                Actualizar
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary float-right mr-2" onClick={handleAddRecord}>
                                                Agregar otro campo de estudio
                                            </button>
                                        )}
                                        <Link to="/create-csv/section/headerCV" className="btn btn-secondary justify-content-between">
                                            Regresar
                                        </Link>
                                    </div>
                                </div>
                                {/* Renderizar tarjetas expandibles */}
                                {workRecords.map((record, index) => (
                                    record ? (
                                        <div className="card card-success collapsed-card" key={index}>
                                            <div className="card-header">
                                                <h3 className="card-title">
                                                    {record.certification || 'No disponible'} - {record.start_date || 'Fecha de inicio no disponible'} - {record.end_date || (record.currently_studying ? 'Actual' : 'No disponible')}
                                                </h3>
                                                <div className="card-tools">
                                                    <button type="button" className="btn btn-tool" onClick={() => handleDelete(record.id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-tool"
                                                        onClick={() => {
                                                            //actualiza los valores del formdata con los del record
                                                            setFormData({
                                                                school: record.school || '',
                                                                citySchool: record.city_school || '',
                                                                certification: record.certification || '',
                                                                fieldOfStudy: record.field_of_study || '',
                                                                startDate: record.start_date || '',
                                                                endDate: record.end_date || '',
                                                                currentlyStudying: record.currently_studying === 1
                                                            });
                                                            setEditId(record.id); //guardar el id del registro para actualizarlo
                                                        }}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p>Universidad: {record.school || 'Sin nombre'}</p>
                                                <p>Ciudad: {record.city_school || 'No disponible'}</p>
                                                <p>Campo de estudio: {record.field_of_study || 'No disponible'}</p>
                                                <p>Fecha de inicio: {record.start_date || 'No disponible'}</p>
                                                <p>Fecha de finalización: {record.end_date || (record.currently_studying ? 'Actual' : 'No disponible')}</p>
                                            </div>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                            {/* ./form */}

                            {/* Preview */}
                            <div className="col-md-5">
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
                                                <TemplateComponent
                                                    color={selectedColor}
                                                    editable={true}
                                                    {...userDataFromSections} //pasar todos los datos como propiedades
                                                    {...formData}
                                                    workRecords={workRecords}
                                                />
                                            ) : (
                                                <p>No se ha seleccionado ninguna plantilla.</p>
                                            )}
                                        </Suspense>
                                    </div>
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

export default WorkhistoryCV