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
import { actualizarEducacion, checkdatasection, checkSections, eliminarEducacion, guardareducacion } from '../../../utils/curriculums/curriculums';

const StudiesCV = () => {
    //variables globales para el contexto (retoma la plantilla y el color elegidos) anteriormente
    const { userData, selectedTemplate, selectedColor, setSelectedTemplate, setSelectedColor } = useContext(curriculumContext);

    //obten el id del cv modificado actualmente
    const idcv_usertemplate = localStorage.getItem("cv_id");

    //navegacion programatica desde el codigo
    const navigate = useNavigate();

    const [TemplateComponent, setTemplateComponent] = useState(null); //componente de la plantilla
    const [isLoading, setIsLoading] = useState(true); //carga del preloader
    const [color, setColor] = useState(selectedColor);//color de la plantilla
    //formdata formulario
    const [formData, setFormData] = useState({
        school: '',
        citySchool: '',
        certification: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        currentlyStudying: false
    });
    const [educationRecords, setEducationRecords] = useState([]); //array de elementos extraidos
    const [editId, setEditId] = useState(null);
    const [completedSections, setCompletedSections] = useState([]); //secciones completadas
    const [userDataFromSections, setUserDataFromSections] = useState({}); //datos de las secciones

    //filtra las plantillas exluyendo la que fue seleccionada
    const filteredTemplates = Object.keys(templates).filter(templateName => templateName !== selectedTemplate);

    //colores disponibles
    const colors = ["#6c757d", "#17a2b8", "#28a745", "#ffc107", "#01ff70", "#e83e8c", "#343a40"];
    const selectResume = (color) => {
        //actualiza el estado del color
        setColor(color);
    };

    //cambio en el formdata
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        const hasFormData = Object.values(formData).some(value => value !== '' && value !== false); //verifica si el formulario tiene datos
        if (hasFormData) {
            showInfoToast('Por favor, incluye tus datos para llegar a la siguiente sección');
            return; //no enviar datos si el formulario esta vacio
        }
        e.preventDefault();

        // Navegar a la siguiente seccion
        navigate('/create-csv/section/workhistory');
    };

    //guarda la informacion al agregar otro campo
    const handleAddAnother = async () => {
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
                currentlyStudying: formData.currentlyStudying ? 1 : 0,  //conversion a tinyint
                endDate: formData.currentlyStudying ? null : formData.endDate,
            };

            //envia los datos al endpoint
            const response = await guardareducacion(dataToSubmit);
            console.log(response)
            if (response.status === 200 && response.data.content) {
                //agregar el nuevo registro al estado
                setEducationRecords(prevRecords => [response.data.content, ...prevRecords]);
                //limpiar el formulario después de enviar los datos
                setFormData({
                    school: '',
                    citySchool: '',
                    certification: '',
                    fieldOfStudy: '',
                    startDate: '',
                    endDate: '',
                    currentlyStudying: false
                });
                showSuccessToast(response.data.message);
            } else {
                showErrorToast('Error en la respuesta del servidor.');
            }
        } catch (error) {
            showErrorToast('Error al agregar el campo de estudio.' + error);
        }
    };

    //actualizar usuario
    const handleUpdate = async () => {

        try {
            //prepara los datos a enviar para la actualizacion
            const dataToSubmit = {
                id: editId, //identificador del registro a actualizar
                cvid_user_template: idcv_usertemplate,
                user_id: userData?.id,
                ...formData,
                currentlyStudying: formData.currentlyStudying ? 1 : 0, //conversion a tinyint
                endDate: formData.currentlyStudying ? null : formData.endDate,
            };

            //envia los datos al endpoint de actualizacion
            const response = await actualizarEducacion(dataToSubmit);

            //maneja la respuesta
            if (response.status === 200 && response.data.content) {
                //actualiza el registro especifico en el estado
                setEducationRecords(prevRecords =>
                    prevRecords.map(record =>
                        //recorre los registros hasta encontrarlo
                        record.id === editId ? response.data.content : record
                    )
                );
                //limpia el formulario y el ID de edicion
                setFormData({
                    school: '',
                    citySchool: '',
                    certification: '',
                    fieldOfStudy: '',
                    startDate: '',
                    endDate: '',
                    currentlyStudying: false
                });
                setEditId(null);
                showSuccessToast(response.data.message) //muestra el mensaje del servidor
            } else{
                showErrorToast(response.status)
            }
        } catch (error) {
            console.error('Error al actualizar el registro:', error);
        }
    };

    //eliminar registro
    const handleDelete = async (id) => {
        try {
            //confirmar la eliminacion con el usuario
            const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
            if (!confirmDelete) return;
    
            //enviar la solicitud de eliminacion al endpoint
            const response = await eliminarEducacion(id);
    
            //verificar la respuesta
            if (response.status === 200) {
                //eliminar el registro del estado
                setEducationRecords(prevRecords =>
                    //filtra hasta encontrar el registro
                    prevRecords.filter(record => record.id !== id)
                );
                //limpia el formulario y el ID de edicion
                setFormData({
                    school: '',
                    citySchool: '',
                    certification: '',
                    fieldOfStudy: '',
                    startDate: '',
                    endDate: '',
                    currentlyStudying: false
                });
                showSuccessToast(response.data.message);
                setEditId(null);
            } else {
                showInfoToast('Error al eliminar el registro', response.status);
            }
        } catch (error) {
            showErrorToast('Error al eliminar el registro:', error);
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

    //verificar las secciones completadas
    useEffect(() => {
        const checkUserSections = async () => {
            try {
                let tables = ["userinformation"];
                let response = await checkSections(idcv_usertemplate, tables);
                if (response.status === 200) {
                    setCompletedSections(response.data.status);
                }
            } catch (error) {
                showErrorToast('Error al verificar las secciones.');
            }
        };
        checkUserSections();
    }, [idcv_usertemplate]);

    //obtener datos del usuario de las tablas completadas
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const tables = ["userinformation"];
                const response = await checkdatasection(idcv_usertemplate, tables);

                if (response.status === 200) {
                    const userInfoArray = response.data.data.userinformation;

                    //verifica si el array tiene al menos un elemento
                    if (userInfoArray.length > 0) {
                        const data = userInfoArray[0];  //accede al primer objeto en el array

                        const transformedData = {
                            name: data.name,
                            surname: data.surname,
                            city: data.city,
                            municipality: data.municipality,
                            address: data.address,
                            colony: data.colony,
                            postalCode: data.postal_code,
                            phone: data.phone,
                            email: data.email,
                            photo: `http://127.0.0.1:8000/utils/photo/${data.photo}`
                        };

                        setUserDataFromSections(transformedData);
                    } else {
                        throw new Error('No se encontró información del usuario.');
                    }
                } else {
                    throw new Error('Error al obtener los datos del usuario.');
                }
            } catch (error) {
                showErrorToast(error.message || 'Error al obtener los datos del usuario.');
            }
        };

        if (completedSections.length >= 0) {
            fetchUserData();
        }
    }, [completedSections, idcv_usertemplate]);

    return (
        <div className="layout-top-nav layout-navbar-fixed layout-footer-fixed sidebar-collapse sidebar-mini">
            {/* Preloader */}
            {isLoading && <Preloader setIsLoading={setIsLoading} />}
            {/* Preloader */}

            {/* Navbar */}
            <Navbar brandText="CvBoost" userData={userData} />
            {/* Navbar */}

            {/* <!-- Main Sidebar Container --> */}
            <AsideBarOr completedSections={completedSections} activeSection="studies" userData={userData} />
            {/* ./main sidebar */}

            {/* Content wrapper */}
            <div className="content-wrapper ml-0">
                {/* Page header */}
                <PageHeader
                    title="Curriculum vitae >"
                    subtitle="Estudios"
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

                            {/* Form */}
                            <div className="col-md-7">
                                <div className="card card-success">
                                    <div className="card-header">
                                        <h3 className="card-title">Cuentanos sobre tus estudios</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <p className="">Incluye cada escuela, incluso si aún estudias allí o no te graduaste.</p>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="school">Nombre de la institución</label>
                                                    <input
                                                        type="text"
                                                        id="school"
                                                        className="form-control"
                                                        placeholder="Nombre de la institución"
                                                        value={formData.school || ''}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="citySchool">Ciudad</label>
                                                    <input
                                                        type="text"
                                                        id="citySchool"
                                                        className="form-control"
                                                        placeholder="Ciudad"
                                                        value={formData.citySchool || ''}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="certification">Certificación</label>
                                                    <input
                                                        type="text"
                                                        id="certification"
                                                        className="form-control"
                                                        placeholder="Certificación obtenida"
                                                        value={formData.certification || ''}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="fieldOfStudy">Campo de estudio</label>
                                                    <input
                                                        type="text"
                                                        id="fieldOfStudy"
                                                        className="form-control"
                                                        placeholder="Campo de estudio"
                                                        value={formData.fieldOfStudy || ''}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="startDate">Fecha de inicio</label>
                                                    <input
                                                        type="date"
                                                        id="startDate"
                                                        className="form-control"
                                                        value={formData.startDate || ''}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="endDate">Fecha de finalización</label>
                                                    <input
                                                        type="date"
                                                        id="endDate"
                                                        className="form-control"
                                                        value={formData.currentlyStudying ? '' : formData.endDate || ''}
                                                        onChange={handleChange}
                                                        disabled={formData.currentlyStudying}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-right">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        id="currentlyStudying"
                                                        className="form-check-input"
                                                        checked={formData.currentlyStudying}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="currentlyStudying" className="form-check-label">
                                                        Actualmente sigo estudiando en esta institución
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-success float-right" onClick={handleSubmit}>
                                            Siguiente
                                        </button>
                                        {editId ? (
                                            <button className="btn btn-success float-right mr-2" onClick={handleUpdate}>
                                                Actualizar
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary float-right mr-2" onClick={handleAddAnother}>
                                                Agregar otro campo de estudio
                                            </button>
                                        )}
                                        <Link to="/create-csv/section/headerCV" className="btn btn-secondary justify-content-between">
                                            Regresar
                                        </Link>
                                    </div>
                                </div>
                                {/* Renderizar tarjetas expandibles */}
                                {educationRecords.map((record, index) => (
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
                                                    educationRecords={educationRecords}
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

export default StudiesCV