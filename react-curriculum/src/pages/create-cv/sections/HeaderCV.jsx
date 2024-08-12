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
import { showErrorToast, showWarningToast, showInfoToast } from '../../../components/common/SweetAlert2';
import { templates } from '../../../utils/plantillasConfig'; //plantilas

//helper
import { checkdatasection, checkSections, guardarencabezadocv, uploadFile } from '../../../utils/curriculums/curriculums';
import { getTransformationFunction } from '../../../utils/curriculums/dataTransformer';

const HeaderCV = () => {
    //variables globales para el contexto (retoma la plantilla y el color elegidos) anteriormente
    const { userData, selectedTemplate, selectedColor, setSelectedTemplate, setSelectedColor } = useContext(curriculumContext);
    //filtra las plantillas exluyendo la que fue seleccionada
    const filteredTemplates = Object.keys(templates).filter(templateName => templateName !== selectedTemplate)

    //obten el id del cv modificado actualmente
    const idcv_usertemplate = localStorage.getItem("cv_id");

    //navegacion programatica desde el codigo
    const navigate = useNavigate();

    const [TemplateComponent, setTemplateComponent] = useState(null); //componente de la plantilla
    const [isLoading, setIsLoading] = useState(true); //carga del preloader
    const [color, setColor] = useState(selectedColor);//color de la plantilla
    //formdata del formulario
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        city: '',
        municipality: '',
        address: '',
        colony: '',
        postalCode: 0,
        phone: 0,
        email: '',
    });
    const [photo, setPhoto] = useState(null); //foto
    const [photoPreview, setPhotoPreview] = useState(null);//previsualizacion de fotografia
    const [errors, setErrors] = useState({});//almacena errores del usuario
    const [completedSections, setCompletedSections] = useState([]); //secciones completadas
    const [userDataFromSections, setUserDataFromSections] = useState({}); //datos de las secciones

    //llenado del formdata
    const handleInputChange = (e) => {
        //recibe un parametro del input
        const { name, value } = e.target;
        //actualiza el formdata con su key y valor
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //colores disponibles
    const colors = ["#6c757d", "#17a2b8", "#28a745", "#ffc107", "#01ff70", "#e83e8c", "#343a40"];
    const selectResume = (color) => {
        //actualiza el estado del color
        setColor(color);
    };

    const validateInput = () => {
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,'#]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const addressRegex = /^[a-zA-Z0-9\s.,'#]*$/;

        let errors = {}; //almacena errores

        //validacion de campos vacios
        if (!formData.name) errors.name = "El nombre es obligatorio.";
        if (!formData.surname) errors.surname = "El apellido es obligatorio.";
        // if (!formData.city) errors.city = "La ciudad es obligatoria.";
        // if (!formData.municipality) errors.municipality = "El municipio es obligatorio.";
        // if (!formData.address) errors.address = "La dirección es obligatoria.";
        // if (!formData.colony) errors.colony = "La colonia es obligatoria.";
        // if (!formData.postalCode) errors.postalCode = "El código postal es obligatorio.";
        if (!formData.phone) errors.phone = "El teléfono es obligatorio.";
        if (!formData.email) errors.email = "El correo electrónico es obligatorio.";

        //validacion de formato
        if (formData.name && !nameRegex.test(formData.name)) errors.name = "Nombre inválido.";
        if (formData.surname && !nameRegex.test(formData.surname)) errors.surname = "Apellido inválido.";
        if (formData.city && !nameRegex.test(formData.city)) errors.city = "Ciudad inválida.";
        if (formData.municipality && !nameRegex.test(formData.municipality)) errors.municipality = "Municipio inválido.";
        if (formData.address && !addressRegex.test(formData.address)) errors.address = "Dirección inválida.";
        if (formData.colony && !nameRegex.test(formData.colony)) errors.colony = "Colonia inválida.";
        if (formData.email && !emailRegex.test(formData.email)) errors.email = "Correo electrónico inválido.";
        if (formData.phone && !phoneRegex.test(formData.phone)) errors.phone = "Teléfono inválido, debe contener exactamente 10 dígitos.";

        //si hay errores
        if (Object.keys(errors).length > 0) {
            //guardalos en setErrors
            setErrors(errors);
            //muestra los errores
            Object.values(errors).forEach(error => showErrorToast(error));
            return false;
        }

        setErrors({}); //si no hay errores limpia la variable
        return true; //procede
    };

    const handleSubmit = async () => {
        if (validateInput()) {
            try {
                let photoFilename = null;
                if (photo) {
                    try {
                        const response = await uploadFile(photo, userData?.full_name);
                        if (response.status === 200 && response.data.filename) {
                            photoFilename = response.data.filename;
                        } else {
                            showInfoToast("No se subió ninguna foto.");
                        }
                    } catch (error) {
                        showInfoToast("Hubo un error al subir la foto.");
                    }
                }

                const userInfo = {
                    cvid_user_template: idcv_usertemplate,
                    id_user: userData?.id,
                    ...formData,
                    photo: photoFilename
                };

                //sube la informacion al backend
                const response = await guardarencabezadocv(userInfo);

                if (response.status === 200) {
                    navigate("/create-csv/section/studies");
                } else {
                    //si la respuesta no es exitosa muestra un mensaje de error
                    showErrorToast("Error al enviar la información del usuario");
                }
            } catch (error) {
                //si hay un error durante la solicitud muestralo al usuario
                showErrorToast(error.message);
            }
        } else {
            //si la validacion falla muestra una advertencia
            showWarningToast("Por favor, completa todos los campos requeridos");
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
                const tables = Object.keys(completedSections).filter(table => completedSections[table]);
                if (tables.length === 0) return;

                const response = await checkdatasection(idcv_usertemplate, tables);
                if (response.status === 200) {
                    const transformedData = {};

                    for (const table of tables) {
                        const tableData = response.data.data[table];
                        if (tableData && tableData.length > 0) {
                            const transformer = getTransformationFunction(table);
                            transformedData[table] = transformer(tableData[0]);
                        }
                    }
                    setUserDataFromSections(transformedData);
                    
                } else {
                    throw new Error('Error al obtener los datos del usuario.');
                }
            } catch (error) {
                showErrorToast(error.message || 'Error al obtener los datos del usuario.');
            }
        };

        if (completedSections && Object.keys(completedSections).length > 0) {
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
            <AsideBarOr completedSections={completedSections} activeSection="userinformation" userData={userData} />
            {/* ./main sidebar */}

            {/* Content wrapper */}
            <div className="content-wrapper ml-0">
                {/* Page header */}
                <PageHeader
                    title="Curriculum vitae >"
                    subtitle="Encabezado"
                    breadcrumbs={[
                        { label: "Inicio", href: "#" },
                        { label: "Plantillas", href: "#" },
                        { label: "Encabezado CV", active: true }
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
                                                                        {...formData}
                                                                        photo={photoPreview}
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
                                                                                    {...formData}
                                                                                    photo={photoPreview}
                                                                                    color={color}
                                                                                    editable={true}
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
                                <p style={{ fontSize: '0.9rem' }}>Te sugerimos incluir un correo electrónico y un número telefónico</p>
                            </div>
                            {/* ./alert */}

                            {/* Form */}
                            <div className="col-md-7">
                                <div className="card card-success">
                                    <div className="card-header">
                                        <h3 className="card-title">¿Como pueden contactarte?</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Nombre</label>
                                                    <input
                                                        type="text"
                                                        id="inputName"
                                                        name="name"
                                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                        placeholder="Nombre(s)"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="surname">Apellidos</label>
                                                    <input
                                                        type="text"
                                                        id="inputSurname"
                                                        name="surname"
                                                        className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                                                        placeholder="Apellido(s)"
                                                        value={formData.surname}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="city">Ciudad/Localidad</label>
                                                    <input
                                                        type="text"
                                                        id="inputCity"
                                                        name="city"
                                                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                                        placeholder="Ciudad"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="municipality">Alcaldía/Municipio</label>
                                                    <input
                                                        type="text"
                                                        id="inputMunicipality"
                                                        name="municipality"
                                                        className={`form-control ${errors.municipality ? 'is-invalid' : ''}`}
                                                        placeholder="Municipio"
                                                        value={formData.municipality}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.municipality && <div className="invalid-feedback">{errors.municipality}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="address">Domicilio</label>
                                                    <input
                                                        type="text"
                                                        id="inputAddress"
                                                        name="address"
                                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                                        placeholder="Dirección"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="colony">Colonia</label>
                                                    <input
                                                        type="text"
                                                        id="inputColony"
                                                        name="colony"
                                                        className={`form-control ${errors.colony ? 'is-invalid' : ''}`}
                                                        placeholder="Colonia"
                                                        value={formData.colony}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.colony && <div className="invalid-feedback">{errors.colony}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="postalCode">Código Postal</label>
                                                    <input
                                                        type="text"
                                                        id="inputPostalCode"
                                                        name="postalCode"
                                                        className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                                                        placeholder="Código Postal"
                                                        value={formData.postalCode}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Teléfono</label>
                                                    <input
                                                        type="text"
                                                        id="inputPhone"
                                                        name="phone"
                                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                        placeholder="Teléfono"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Correo Electrónico</label>
                                                    <input
                                                        type="text"
                                                        id="inputEmail"
                                                        name="email"
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        placeholder="Correo Electrónico"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="photo">Fotografía</label>
                                                    <input
                                                        type="file"
                                                        id="inputPhoto"
                                                        className="form-control"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files[0]) {
                                                                const file = e.target.files[0];
                                                                setPhoto(file);  //guardamos el archivo real
                                                                setPhotoPreview(URL.createObjectURL(file)); //generamos la URL de previsualizacion
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-success float-right" onClick={handleSubmit}>
                                            Siguiente
                                        </button>
                                        <Link to="/create-csv/select-template" className="btn btn-secondary justify-content-between">
                                            Regresar
                                        </Link>
                                    </div>
                                </div>
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
                                                    {...formData}
                                                    {...userDataFromSections} //pasar todos los datos como propiedades
                                                    photo={photoPreview}
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

export default HeaderCV