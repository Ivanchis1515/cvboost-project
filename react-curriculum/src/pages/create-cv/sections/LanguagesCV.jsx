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
import Slider from '../../../components/common/Slider';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../../components/common/SweetAlert2';
//configuracion de plantillas
import { templates } from '../../../utils/plantillasConfig';

//helpers
import { actualizaLenguaje, eliminarLenguaje, guardaLenguaje } from '../../../utils/curriculums/curriculums';

const LanguagesCV = () => {
    const navigate = useNavigate();
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
        languages: [{ name: '', level: 0 }] //lista inicial con un campo vacio y un valor de slider por defecto
    });

    const [languageRecords, setLanguageRecords] = useState([]); //array de elementos extraidos
    const [editId, setEditId] = useState(null); //id seleccionado
    const [completedSections, setCompletedSections] = useState([]); //secciones completadas
    const [userDataFromSections, setUserDataFromSections] = useState({}); //datos de las secciones

    const handleSubmit = (e) => {
        const hasFormData = formData.languages.length === 0 || formData.languages.every(language => !language.name.trim())
        //verifica si hay habilidades para enviar
        if (!hasFormData) {
            showInfoToast('Por favor, guarde sus datos para avanzar a la siguiente sección');
            return;
        }
        e.preventDefault();

        //navegar a la siguiente seccion
        // navigate('/create-csv/section/languages');
    };

    //funcion para agregar registro
    const handleAddRecord = async () => {
        const hasFormData = formData.languages.length === 0 || formData.languages.every(language => !language.name.trim())
        // Verifica si hay habilidades para enviar
        if (hasFormData) {
            showInfoToast('Por favor, añade al menos un lenguaje para guardar');
            return;
        }

        try {
            //para cada habilidad dentro del form
            for (const language of formData.languages) {
                //prepara los datos a enviar
                const dataToSubmit = {
                    user_id: userData?.id,
                    cvid_user_template: idcv_usertemplate,
                    language: language.name,
                    level: language.level
                };

                //envia los datos al endpoint
                const response = await guardaLenguaje(dataToSubmit);
                if (response.status === 200) {
                    setLanguageRecords(prevRecords => [...prevRecords, response.data.content]);
                    //limpiar el formulario despues de agregar todas las habilidades
                    setFormData({ languages: [{ name: "", level: 1 }] });
                    showSuccessToast(response.data.message);
                } else {
                    showErrorToast(response.status);
                    return;
                }
            }

        } catch (error) {
            showErrorToast('Error al agregar las habilidades', error.message);
        }
    };

    //funcion para actualizar registro existente
    const handleUpdate = async () => {
        try {
            for (const language of formData.languages) {
                //prepara los datos a enviar para la actualizacion
                const dataToSubmit = {
                    id: editId, //identificador del registro a actualizar
                    user_id: userData?.id,
                    cvid_user_template: idcv_usertemplate,
                    language: language.name,
                    level: language.level
                };

                //envia los datos al endpoint de actualizacion
                const response = await actualizaLenguaje(dataToSubmit);
                //maneja la respuesta
                if (response.status === 200) {
                    //actualiza el registro especifico en el estado
                    setLanguageRecords(prevRecords =>
                        prevRecords.map(record =>
                            //recorre los registros hasta encontrarlo
                            record.id === editId ? { ...record, language: language.name } : record
                        )
                    );
                    //limpia el formulario y el ID de edicion
                    setFormData({ languages: [{ name: "", level: 1 }] });
                    setEditId(null); //limpia el id
                    showSuccessToast(response.data.message) //muestra el mensaje del servidor
                } else {
                    showErrorToast(response.status)
                }
            }
            //mostrar nuevamente el boton Añadir aptitud
            const addLanguageButton = document.getElementById('addLanguageButton');
            if (addLanguageButton) {
                addLanguageButton.style.display = 'inline-block';
            }
        } catch (error) {
            showErrorToast('Error al actualizar el registro:' + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            //confirmar la eliminacion con el usuario
            const confirmDelete = window.confirm("¿Estas seguro de que deseas eliminar este registro?");
            if (!confirmDelete) return;

            //enviar la solicitud de eliminacion al endpoint
            const response = await eliminarLenguaje(id);

            //verificar la respuesta
            if (response.status === 200) {
                //eliminar el registro del estado
                setLanguageRecords(prevRecords =>
                    //filtra hasta encontrar el registro
                    prevRecords.filter(record => record.id !== id)
                );
                //limpia el formulario y el ID de edicion
                setFormData({ languages: [{ name: "", level: 1 }] });
                setEditId(null); //limpia el id
                showSuccessToast(response.data.message);
            } else {
                showInfoToast('Error al eliminar el registro', response.status);
            }
        } catch (error) {
            showErrorToast('Error al eliminar el registro:', error);
        }
    }

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
            <AsideBarOr completedSections={completedSections} activeSection="languages" userData={userData} />
            {/* ./main sidebar */}

            {/* Content wrapper */}
            <div className="content-wrapper ml-0">
                {/* Page header */}
                <PageHeader
                    title="Curriculum vitae >"
                    subtitle="Aptitudes"
                    breadcrumbs={[
                        { label: "Inicio", href: "/" },
                        { label: "Plantillas", href: "/create-csv/select-template" },
                        { label: "Encabezado CV", href: "/create-csv/section/headerCV" },
                        { label: "Estudios CV", href: "/create-csv/section/studies" },
                        { label: "Experiencia laboral", href: "/create-csv/section/workhistory" },
                        { label: "Aptitudes CV", active: true }
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
                                    Detalla tus áreas de especialidad enfocándote en tus competencias más relevantes.
                                </p>
                            </div>
                            {/* ./alert */}

                            {/* Form */}
                            <div className="col-md-7">
                                <div className="card card-success">
                                    <div className="card-header">
                                        <h3 className="card-title">Cuentanos tus Competencias</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="card-body">
                                                <div className="row">
                                                    <p className="">
                                                        Añade de 4 a 8 competencias pertinentes de tus trabajos previos.
                                                        Te sugerimos coloques palabras que describieron tus habilidades en tu trabajo.
                                                    </p>
                                                    <div className="form-group">
                                                        {formData.languages.map((language, index) => (
                                                            <div key={index} className="row mb-3">
                                                                <div className="col-sm-8">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Nombre del idioma"
                                                                        value={language.name}
                                                                        onChange={(e) => {
                                                                            const newLanguages = [...formData.languages];
                                                                            newLanguages[index].name = e.target.value;
                                                                            setFormData({ languages: newLanguages });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <Slider
                                                                        min={1}
                                                                        max={5}
                                                                        step={1}
                                                                        initialValue={language.level || 3}
                                                                        onChange={(value) => {
                                                                            const newLanguages = [...formData.languages];
                                                                            newLanguages[index].level = value;
                                                                            setFormData({ languages: newLanguages });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-2 mt-2">
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setFormData((prevData) => ({
                                                                                languages: prevData.languages.filter((_, i) => i !== index),
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
                                                            id="addLanguageButton"
                                                            onClick={() => {
                                                                setFormData((prevData) => ({
                                                                    languages: [...prevData.languages, { name: "", level: 3 }],
                                                                }));
                                                            }}
                                                        >
                                                            Añadir idioma
                                                        </button>
                                                    </div>
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
                                            <button className="btn btn-primary float-right mr-2" onClick={handleAddRecord}>
                                                Agregar Aptitudes
                                            </button>
                                        )}
                                        <Link to="/create-csv/section/workhistory" className="btn btn-secondary justify-content-between">
                                            Regresar
                                        </Link>
                                    </div>
                                </div>
                                {/* Renderizar tarjetas expandibles */}
                                {languageRecords.map((record, index) => (
                                    record ? (
                                        <div className="card card-success collapsed-card" key={index}>
                                            <div className="card-header">
                                                <h3 className="card-title">
                                                    {record.language || 'No disponible'}
                                                    {" - "}
                                                    {(() => {
                                                        switch (record.level) {
                                                            case 1:
                                                                return 'Nivel principiante';
                                                            case 2:
                                                                return 'Nivel básico';
                                                            case 3:
                                                                return 'Nivel intermedio';
                                                            case 4:
                                                                return 'Avanzado';
                                                            case 5:
                                                                return 'Muy avanzado';
                                                            default:
                                                                return 'Nivel desconocido';
                                                        }
                                                    })()}
                                                </h3>
                                                <div className="card-tools">
                                                    <button type="button" className="btn btn-tool" onClick={() => handleDelete(record.id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-tool"
                                                        onClick={() => {
                                                            // Actualiza los valores del formData con los del record
                                                            setFormData({
                                                                languages: [{ name: record.language, level: record.level }] || [{ name: "", level: 1 }],
                                                            });
                                                            setEditId(record.id); // Guarda el id del registro para actualizarlo
                                                            // Oculta el botón "Añadir aptitud"
                                                            const addLanguageButton = document.getElementById('addLanguageButton');
                                                            if (addLanguageButton) {
                                                                addLanguageButton.style.display = 'none';
                                                            }
                                                        }}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                {/* Validación y conversión del nivel de idioma */}
                                                <p>
                                                    {(() => {
                                                        switch (record.level) {
                                                            case 1:
                                                                return 'Nivel principiante';
                                                            case 2:
                                                                return 'Nivel básico';
                                                            case 3:
                                                                return 'Nivel intermedio';
                                                            case 4:
                                                                return 'Avanzado';
                                                            case 5:
                                                                return 'Muy avanzado';
                                                            default:
                                                                return 'Nivel desconocido';
                                                        }
                                                    })()}
                                                </p>
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
                                                    languageRecords={languageRecords}
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

export default LanguagesCV