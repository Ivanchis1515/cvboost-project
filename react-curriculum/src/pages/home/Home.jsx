//importaciones de react
import React, { useState, useEffect, useContext } from 'react';

//contexto
import { curriculumContext } from '../../context/curriculumContext';

//navegacion entre pantallas
import { Link } from 'react-router-dom';

//recursos
import CV1 from '../../assets/img/curriculums/CVBoostcurri1.png';
import CV2 from '../../assets/img/curriculums/CVBoostcurri2.png';

import Step from '../../assets/img/step_by.svg';
import MenuList from '../../assets/img/menu_list.svg';
import PaperPen from '../../assets/img/paper_pen.svg';
import FolerDownload from '../../assets/img/folder_download.svg';

//commons
import ColorPicker from '../../components/common/ColorPicker';
import { templates } from '../../utils/plantillasConfig'; //plantillas CV

//layouts
import Navbarhome from '../../components/layout/navbar/Navbarhome';
import Footerhome from '../../components/layout/footer/Footerhome';

//estilos
import '../../styles/specific/Home/Bannerheader.css';

const Home = () => {
    const { userData } = useContext(curriculumContext); //variables globales

    //convertir las claves del objeto templates en una lista para iterar
    const templateKeys = Object.keys(templates);
    const [loadedComponents, setLoadedComponents] = useState({}); //plantillas
    
    //estado para retomar el color seleccionado
    const [color, setColor] = useState("");
    //estado para verificar en que imagen se encuentra el carrusel
    const [currentIndex, setCurrentIndex] = useState(0);

    //colores para el color-picker
    const colors = ["#6c757d", "#17a2b8", "#28a745", "#ffc107", "#01ff70", "#e83e8c", "#343a40"];
    const selectResume = (selectedColor) => {
        //guarda el color seleccionado en el estado
        setColor(selectedColor);
    };

    //array de imagenes
    const images = [
        CV1,
        CV2
    ]

    //seccion Demo 
    const sectionStyle = {
        backgroundColor: '#001f3f',
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
        margin: '1rem 0',
        textAlign: 'center'
    };
    //decoración de la tarjeta demo
    const circleStyle = (width, height, top, left, bottom, right) => ({
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        width: width,
        height: height,
        top: top,
        left: left,
        bottom: bottom,
        right: right,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); //cambia cada 4 segundos

        const loadComponents = async () => {
            const components = {};
            for (const key of templateKeys) {
                try {
                    const module = await templates[key].component();
                    components[key] = module.default;
                } catch (error) {
                    console.error(`Error loading component ${key}:`, error);
                }
            }
            setLoadedComponents(components);
        };
        loadComponents();

        return () => clearInterval(interval); //limpia el intervalo al desmontar (repite nuevamente)
    }, [images.length, templateKeys]);


    return (
        <>
            {/* Navbar */}
            <Navbarhome userData={userData} />
            {/* Navbar */}

            {/* Content-wrapper */}
            <div className="content-wrapper m-0 bg-white">
                {/* Header Banner */}
                <header>
                    <div id="waves">
                        <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 500 250"
                            style={{ enableBackground: "new 0 0 500 250" }}
                            xmlSpace="preserve"
                            className="wave"
                        >
                            <g>
                                <path
                                    className="st0"
                                    d="M500.328,14c0,0-13.623,51.722-10.1,92.416c2.199,25.401-0.293,52.124-17.313,69.563
                                        c-25.522,26.15-69.934,37.223-69.934,37.223c-31.601,7.2-17.175-66.095-72.82-32.058
                                        c-67.359,41.202-100.987,39.281-100.987,39.281c-55.646,0.655-110.74-38.906-110.74-38.906
                                        C64.793,139.278,2.369,195.154,0,197.591V250h500V14H500.328z"
                                />
                            </g>
                        </svg>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="wave2"
                            viewBox="0 0 1280 720"
                            style={{ enableBackground: "new 0 0 1280 720" }}
                            xmlSpace="preserve"
                        >
                            <g>
                                <g>
                                    <path
                                        className="st1"
                                        d="M-3.195,507c36.997,69.25,113.836,59.764,182.138,58.815c39.843,0,81.583-0.949,119.528,10.435
                                        c25.613,7.589,39.843,29.408,67.353,32.254c26.562,1.897,51.226-4.743,75.891-9.486c31.305-4.743,65.456-5.692,96.761-0.949
                                        c28.459,4.743,55.021,14.23,84.428,10.435c31.305-3.795,53.124-23.716,82.531-32.254c44.586-12.332,106.247-17.075,149.884,0
                                        c19.921,7.589,43.637,14.23,65.456,12.332c29.408-3.795,47.432-31.305,75.891-40.791c47.432-15.178,91.069,18.024,139.449,15.178
                                        c25.613-1.897,50.278-9.486,74.942-17.075c28.459-8.538,46.483-22.767,71.148-38.894c8.538,20.87-0.949,51.226,5.692,73.994
                                        c6.641,23.716,16.127,41.74,15.178,67.353c-0.949,20.87-6.641,43.637-12.332,63.559c-8.538,34.151-20.87,44.586-55.969,43.637
                                        c-63.558-1.897-124.271-17.075-188.778-5.692c-80.634,15.178-165.062,1.897-246.645,6.64
                                        c-33.202,1.897-66.404,11.384-99.607,8.538c-53.124-4.743-106.247-8.538-159.371-10.435
                                        c-44.586-0.949-86.326,5.692-129.963,8.538c-36.997,2.846-73.993-1.897-110.99-7.589c-39.843-6.64-78.737-11.384-118.579-12.332
                                        c-34.151-0.949-68.302,3.795-103.401,1.897c-34.151-1.897-69.25-13.281-101.504-24.664
                                        c-28.459-10.435-56.918-19.921-57.867-54.072c-0.949-27.51,9.486-58.815,23.716-81.583c7.589-12.332,15.178-26.562,24.665-36.997
                                        c10.435-11.384,27.51-20.87,29.408-36.997"
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>

                    <div className="maintitle">
                        <h1>
                            <b>CV</b>Boost
                        </h1>
                        <div className="right-section">
                            <p className="description">
                                Selecciona una plantilla, usa el contenido que ponemos a tu disposición y descarga el documento. ¡Así de fácil!
                            </p>
                            <h2>
                                <Link to="/create-csv" className="js-anchor-link">
                                    Crea tu curriculum vitae
                                </Link>
                            </h2>
                        </div>
                    </div>
                </header>
                {/* end header banner */}

                {/* Main content */}
                <div className="content">

                    {/* Container description */}
                    <div className="container mb-5">
                        <div className="d-none d-lg-block">
                            {/* Diseño para pantallas grandes */}
                            <div className="row py-5 justify-content-center align-items-center">
                                <div className="col-12 text-center mb-4">
                                    <h2 className="display-6">
                                        Crea un <span className="text-navy">currículum profesional</span>
                                    </h2>
                                    <p className="lead" style={{ fontSize: "1.5rem" }}>Editor online de uso fácil e intuitivo</p>
                                </div>
                                <div className="col-6">
                                    <ul className="list-unstyled bullets-v3" style={{ fontSize: "1.3rem" }}>
                                        <li className="mb-3"><i className="fa fa-check-circle text-success" /> <span>Escoge entre <b>una amplia selección</b> de plantillas</span></li>
                                        <li className="mb-3"><i className="fa fa-check-circle text-success" /> <span><b>Un CV personalizado</b> en cuestión de minutos</span></li>
                                        <li className="mb-3"><i className="fa fa-check-circle text-success" /> <span>Descárgalo en <b>el formato que necesites</b></span></li>
                                        <li className="mb-3"><i className="fa fa-check-circle text-success" /> <span><b>Envíe su candidatura</b> a los reclutadores</span></li>
                                    </ul>
                                    <div className="mt-3">
                                        <Link to="/create-csv" className="btn btn-primary">Crear mi CV ahora</Link>
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <div id="carouselExample" className="carousel slide">
                                        <div className="carousel-inner">
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                                                    style={{
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        transition: 'transform 0.5s ease-in-out',
                                                        transform: index === currentIndex ? 'scale(1.05)' : 'scale(1)',
                                                    }}
                                                >
                                                    <img
                                                        src={image}
                                                        className="d-block"
                                                        alt={`Slide ${index}`}
                                                        style={{
                                                            objectFit: 'cover',
                                                            width: '50%',
                                                            height: '50%',
                                                            margin: '0 auto',

                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Diseño para pantallas medianas y pequeñas */}
                        <div className="d-lg-none">
                            <div className="row py-5 justify-content-center align-items-center">
                                <div className="col-12 col-md-8">
                                    <h2 className="display-6 homepage-title-v2">
                                        Crea un <span className="text-navy">currículum profesional</span>
                                    </h2>
                                    <p className="lead" style={{ fontSize: "1.5rem" }}>Editor online de uso fácil e intuitivo</p>
                                    <ul className="list-unstyled bullets-v3" style={{ fontSize: "1.3rem" }}>
                                        <li className="mb-3"><i className="fa fa-check-circle text-success" /> <span>Escoge entre <b>una amplia selección</b> de plantillas</span></li>
                                        <li className="mb-3"><i className="fa fa-check-circle text-success" /> <span><b>Un CV personalizado</b> en cuestión de minutos</span></li>
                                        <li className="mb-3"><i className="fa fa-check-circle text-success" /> <span>Descárgalo en <b>el formato que necesites</b></span></li>
                                        <li className="mb-3"><i className="fa fa-check-circle text-success" /> <span><b>Envíe su candidatura</b> a los reclutadores</span></li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <div id="carouselExample" className="carousel slide">
                                        <div className="carousel-inner">
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                                                    style={{
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        transition: 'transform 0.5s ease-in-out',
                                                        transform: index === currentIndex ? 'scale(1.05)' : 'scale(1)',
                                                    }}
                                                >
                                                    <img
                                                        src={image}
                                                        className="d-block"
                                                        alt={`Slide ${index}`}
                                                        style={{
                                                            objectFit: 'cover',
                                                            width: '100%',
                                                            height: '100%',
                                                            margin: '0 auto',

                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <Link to="/create-csv" className="btn btn-primary">Crear mi CV ahora</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ./container-description */}

                    {/* Carrusel CV */}
                    <div className="bg-light p-5 mb-5" style={{ borderTopLeftRadius: '50px', borderTopRightRadius: '50px' }}>
                        <div className="container-fluid">
                            <h2 className="display-6 text-center">Aprende a crear un currículum perfecto</h2>
                            <p className="lead text-center mb-4">
                                Aprovecha las numerosas plantillas de cartas de presentación online adaptadas a tu sector de actividad e incluso a tu profesión.
                                <br></br>
                                Elija el estilo que más le convenga para destacar y conseguir el trabajo de sus sueños.
                            </p>
                            <div className="row justify-content-center">
                                <div className="col-12 text-center mb-3">
                                    <ColorPicker onSelect={selectResume} colors={colors} />
                                </div>
                                <div id="carouselExampleIndicators" className="carousel slide col-12 col-md-9 col-lg-6 col-xl-4" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        {templateKeys.map((key, index) => (
                                            <li
                                                key={key}
                                                data-target="#carouselExampleIndicators"
                                                data-slide-to={index}
                                                className={index === 0 ? 'active' : ''}
                                            ></li>
                                        ))}
                                    </ol>
                                    <div className="carousel-inner">
                                        {templateKeys.map((key, index) => {
                                            const TemplateComponent = loadedComponents[key];
                                            return (
                                                <div
                                                    key={key}
                                                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                                >
                                                    <div className="d-block w-100">
                                                        {TemplateComponent ? (
                                                            <TemplateComponent color={color} />
                                                        ) : (
                                                            <div>Loading...</div>
                                                        )}
                                                    </div>
                                                    <div className="carousel-caption text-dark">
                                                        <Link to="/create-csv" className="btn btn-success carousel-item__btn">
                                                            Elegir plantilla
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ./carrusel-cv */}

                    {/* Section demo */}
                    <section id="no-wait-to-apply" style={sectionStyle} className="py-5">
                        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div className="no-wait-to-apply-content mb-4 mb-md-0">
                                <p className="h1 text-white font-weight-bold">¡No esperes más para aplicar!</p>
                                <Link to="/create-csv" className="btn btn-success btn-lg mt-3">CREAR UN CV</Link>
                            </div>
                            <img src={CV1} alt="Templates" className="img-fluid" style={{ width: "30%", height: "auto" }} />
                        </div>
                        <div style={circleStyle('500px', '500px', '400px', '-100px', '-250px', '1050px')}></div>
                        <div style={circleStyle('600px', '500px', '300px', '150px', null, null)}></div>
                        <div style={circleStyle('500px', '500px', null, null, '-250px', '-250px')}></div>
                    </section>
                    {/* ./section demo */}

                    {/* Features */}
                    <div className="row py-5 justify-content-center">
                        <div className="col-md-12 col-lg-12 col-xl-12 py-5">
                            <div className="text-center mb-4">
                                <h2 className="h2">El generador de CV más útil e intuitivo pero sobre todo ¡GRATUITO!</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <img src={Step} alt="Guía paso a paso" className="img-fluid mb-3 mr-3" style={{ width: "15%" }} />
                                            <span className="h3">Generador paso a paso</span>
                                            <p className="h6">Nuestro práctico generador paso a paso, te permite crear un CV profesional y bien pulido en minutos. Impresiona. Ahorra tiempo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <img src={MenuList} alt="Textos predefinidos" className="img-fluid mb-3 mr-3" style={{ width: "15%" }} />
                                            <span className="h3">Textos predefinidos</span>
                                            <p className="h6">Cuida hasta el último detalle. Elige las descripciones que más se adapten a tu trabajo, sector y gusto de las miles que te ofrecemos. ¡Más fácil, imposible!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <img src={PaperPen} alt="Recomendaciones de expertos" className="img-fluid mb-3 mr-3" style={{ width: "15%" }} />
                                            <span className="h3">Recomendaciones de expertos</span>
                                            <p className="h6">Guíate en todo momento por nuestras sugerencias y consejos. Te pillen o no de nuevas los currículums, nosotros te lo ponemos en bandeja.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <img src={FolerDownload} alt="Descargar" className="img-fluid mb-3 mr-3" style={{ width: "15%" }} />
                                            <span className="h3">Versiones y descargas ilimitadas</span>
                                            <p className="h6">Crea todos los currículums que quieras. Imprímelos, compártelos o descárgalos en formato PDF, DOCX o TXT. ¡Lo que pida el cuerpo!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <Link to="/create-csv" className="btn btn-block btn-success text-center">
                                        <p>Quiero comenzar con mi curriculum</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ./features */}

                    {/* FAQ'S */}
                    <div className="row">
                        <div className="col-12" id="accordion">
                            <h2 className="display-6 text-center">Preguntas frecuentes</h2>
                            <p className="lead text-center">CVBoost responde a todas sus preguntas sobre la generación de CV ¡Hecha un vistazo!</p>
                            <div className="card card-success card-outline">
                                <a className="d-block w-100" data-toggle="collapse" href="#collapseOne">
                                    <div className="card-header">
                                        <h4 className="card-title w-100" style={{ fontSize: '2em' }}>
                                            1. ¿Qué es un curriculum vitae?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                    <div className="card-body" style={{ fontSize: '1.5em' }}>
                                        El currículum vitae o CV, viene del latín.
                                        Significa <strong>curso de vida</strong> y se utiliza en aplicaciones de trabajo.
                                        Tu CV lista tu nivel de educación, diplomas, experiencia laboral, habilidades y otras cualidades importantes.
                                    </div>
                                </div>
                            </div>
                            <div className="card card-success card-outline">
                                <a className="d-block w-100" data-toggle="collapse" href="#collapseOne">
                                    <div className="card-header">
                                        <h4 className="card-title w-100" style={{ fontSize: '2em' }}>
                                            2. ¿Que tan efectivo es generar mi CV de forma automatica?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                    <div className="card-body" style={{ fontSize: '1.5em' }}>
                                        Con nuestras plantillas pre-elaboradas puedes escoger el diseño que más prefieras.
                                        Olvidate de estar creando un CV desde 0.
                                    </div>
                                </div>
                            </div>
                            <div className="card card-success card-outline">
                                <a className="d-block w-100" data-toggle="collapse" href="#collapseTwo">
                                    <div className="card-header">
                                        <h4 className="card-title w-100" style={{ fontSize: '2em' }}>
                                            3. ¿Generar mi CV de forma digital me asegura un trabajo?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapseTwo" className="collapse" data-parent="#accordion">
                                    <div className="card-body" style={{ fontSize: '1.5em' }}>
                                        Si, para obtener la oportunidad de conseguir ese trabajo,
                                        ¡asegúrate de usar un CV agradable y ordenado que destaque!.
                                        Una solicitud de trabajo exitosa comienza con un buen CV.
                                        La decisión de invitar o no a un candidato a una entrevista generalmente se toma sobre la base del currículum.
                                    </div>
                                </div>
                            </div>
                            <div className="card card-success card-outline">
                                <a className="d-block w-100" data-toggle="collapse" href="#collapseThree">
                                    <div className="card-header">
                                        <h4 className="card-title w-100" style={{ fontSize: '2em' }}>
                                            4. ¿Como puedo destacar mi CV?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapseThree" className="collapse" data-parent="#accordion">
                                    <div className="card-body" style={{ fontSize: '1.5em' }}>
                                        Destacar su personalidad y experiencias profesionales en un CV es un ejercicio difícil.
                                        Sin embargo aqui te damos unos consejos que puedes tomar en cuenta:
                                        <ol>
                                            <li>No existe un CV perfecto. El currículum perfecto depende del puesto y de la empresa a la que deseas postularte. ¡Asegúrate de que encaje perfectamente!</li>
                                            <li>Escribe un resumen profesional. En este breve texto, te vendes a ti mismo sin que el empleador tenga que leer todo el currículum.</li>
                                            <li>Indica únicamente información relevante que haya agregado valor a la vacante que estás solicitando y que sea de interés para un futuro empleador.</li>
                                            <li>Incluye información importante en la primera página. Incluye un perfil personal conciso sobre ti.</li>
                                            <li>Usa viñetas y listas numeradas para que tu CV sea claro para los reclutadores.</li>
                                            <li>La dirección de correo electrónico en tu currículum debe ser una dirección de correo electrónico representativa con, preferiblemente, tu nombre completo, sin apodo o dirección impersonal. Así que no menciones 'beachboy_peter@hotmail.com', sino; 'p_garcia90@hotmail.com'.</li>
                                            <li>Elige un diseño llamativo y utiliza un color neutro.</li>
                                            <li>No menciones pasatiempos (exóticos) o intereses que den una imagen extraña o que puedan generar preguntas.</li>
                                            <li>Mantén tu CV breve y agradable. Indica brevemente la información importante.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-success card-outline">
                                <a className="d-block w-100" data-toggle="collapse" href="#collapseFour">
                                    <div className="card-header">
                                        <h4 className="card-title w-100" style={{ fontSize: '2em' }}>
                                            5. ¿También puedo crear un currículum sin experiencia laboral o educación?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapseFour" className="collapse" data-parent="#accordion">
                                    <div className="card-body" style={{ fontSize: '1.5em' }}>
                                        Con CVBoost, puedes decidir qué partes se muestran y en dónde en tu CV.
                                        De esta manera, puedes asegurarte que la persona que evalúa el CV vea de inmediato por qué eres el candidato adecuado para el trabajo o la pasantía,
                                        por ejemplo. Entonces, si tus habilidades, intereses y pasatiempos son más importantes, simplemente colócalos en la parte superior del currículum.
                                    </div>
                                </div>
                            </div>
                            <div className="card card-success card-outline">
                                <a className="d-block w-100" data-toggle="collapse" href="#collapseFive">
                                    <div className="card-header">
                                        <h4 className="card-title w-100" style={{ fontSize: '2em' }}>
                                            6. ¿Cuántas plantillas de currículum puedo crear y descargar con CVBoost?
                                        </h4>
                                    </div>
                                </a>
                                <div id="collapseFive" className="collapse" data-parent="#accordion">
                                    <div className="card-body" style={{ fontSize: '1.5em' }}>
                                        Con CVBoost puedes editar y descargar tu CV sin limitaciones.
                                        Puedes adaptar las plantillas y los colores de forma ilimitada a las aplicaciones.

                                        Estas se pueden descargar indefinidamente de forma <strong>GRATUITA</strong>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3 text-center">
                            <p className="lead">
                                <Link to="/">Contactános</Link>,
                                Si no encuentras respuesta ó tienes otra pregunta<br />
                            </p>
                        </div>
                    </div>
                    {/* ./faq's */}

                </div>
                {/* end main content */}
            </div >
            {/* end content-wrapper */}

            {/* Footer */}
            <Footerhome />
            {/* ./footer */}
        </>
    )
}
export default Home