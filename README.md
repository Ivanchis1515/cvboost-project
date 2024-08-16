# CvBoost
## Descripción del Proyecto
El proyecto de CV tiene como finalidad desarrollar una plataforma digital que vaya más allá del currículum tradicional. En lugar de ser simplemente un documento estático, esta plataforma será un entorno interactivo y visualmente atractivo, diseñado específicamente para desarrolladores de software. Aquí, los usuarios podrán documentar y mostrar sus habilidades, proyectos y logros de manera organizada y eficiente.

La estructura del CV incluirá secciones claves como experiencia laboral, habilidades técnicas, educación y portafolio de proyectos, cada una optimizada para resaltar las fortalezas individuales. La interfaz permitirá a los usuarios personalizar su presentación, integrando elementos visuales y multimedia que muestren su trabajo de una manera más inmersiva.

El diseño de la plataforma está pensado para ser intuitivo y accesible, facilitando la navegación tanto para los desarrolladores que lo construyen como para los empleadores o clientes que lo revisan. Con esta herramienta, se busca no solo presentar un perfil profesional completo, sino también destacar de manera diferenciada en un mercado laboral competitivo, maximizando las oportunidades para conectar con nuevas oportunidades y desafíos en el mundo del desarrollo de software.

## Objetivos Generales:
- Crear una plataforma digital estructurada y visualmente atractiva: El CV digital debe ser intuitivo, fácil de navegar y reflejar un diseño moderno que capte la atención de potenciales empleadores o clientes.
- Documentar y presentar habilidades, proyectos y logros: El objetivo es proporcionar un medio para que los usuarios muestren su experiencia de manera clara, detallada y profesional.
- Ofrecer una experiencia interactiva: Incorporar funcionalidades que permitan a los usuarios personalizar su CV.

## Objetivos Específicos:
- Desarrollar un sistema de plantillas personalizables: Permitir a los usuarios elegir y modificar temas de color, para que el CV se ajuste a su estilo personal.
- Implementar una gestión de contenido eficiente: Facilitar la entrada y actualización de información como experiencia laboral, habilidades técnicas, educación y logros.
- Optimizar para diferentes dispositivos: Asegurar que el CV digital sea completamente responsivo, ofreciendo una experiencia óptima en dispositivos móviles, tabletas y escritorios.

## Alcance Funcional:
- Estructura del CV: Incluir secciones predefinidas como experiencia, educación, habilidades y contactos, con la posibilidad de añadir secciones personalizadas.
- Personalización del Diseño: Implementar opciones para que los usuarios puedan modificar colores de acuerdo a su preferencia.
- Soporte Multilingüe: Opcionalmente, incluir la capacidad de crear y mostrar el CV en diferentes idiomas.

## Institución 
Universidad Tecnológica De Puebla

Tecnologías de la Información Ingeniería en Desarrollo y Gestión De Software

### Equipo de trabajo 

1. Hernández Velázquez Jorge Ivan UTP0151511


2. Salas Amaro Nidian	UTP0149290


3. Alarcon Briones Jose Alejandro UTP0149700


4. Jose Angel Luna Sedeño UTP0149900

### Datos docente
Profesor: Paulo Daniel Vázquez Mora

Materia Impartida :Desarrollo Web Integral

## Cvboost-env (backend)
El backend de CvBoost es una aplicación construida con FastAPI que se encarga de gestionar las operaciones relacionadas con la creación y gestión de currículums en línea. Es un sistema modular y escalable, diseñado para soportar un alto rendimiento y facilitar el mantenimiento y la expansión futura del proyecto.

## Tecnologías Empleadas
- **FastAPI**: Un framework moderno y rápido para construir APIs con Python 3.7+ basado en tipos de datos estándar de Python. Proporciona una documentación automática de las rutas y soporta el desarrollo ágil.
- **Uvicorn**: Un servidor ASGI de alto rendimiento, ideal para correr aplicaciones web asíncronas en Python.
- **Pydantic**: Se utiliza para la validación de datos y la configuración, proporcionando una forma de validar los datos de entrada y definir modelos de datos.
- **mysql-connector-python**: Un conector oficial de Python para MySQL que permite la conexión con bases de datos MySQL de forma eficiente.
- **PyJWT**: Una biblioteca utilizada para la gestión y validación de tokens JWT (JSON Web Tokens), que facilita la autenticación segura en la API.
- **Python 3.x**: El lenguaje de programación principal utilizado en todo el backend.

## Estructura del Proyecto Backend
El proyecto está organizado en una carpeta llamada cvboost-env, que agrupa todas las dependencias necesarias para ejecutar la aplicación. La estructura principal es la siguiente:
```
cvboost-env/
├── CVBackend/
│ ├── app/
│ │ ├── middleware/
│ │ │ ├── CORS.py
│ │ ├── models/
│ │ │ ├── curriculums_model.py
│ │ │ ├── terms_model.py
│ │ │ ├── users_model.py
│ │ ├── routes/
│ │ │ ├── curriculums_routes.py
│ │ │ ├── terms_routes.py
│ │ │ ├── user_routes.py
│ │ │ ├── utls_routes.py
│ │ ├── utils/
│ │ │ ├── json_web_token.py
│ │ ├── main.py
│ │ ├── database_config.py
│ ├── upload_files/
│ │ ├── images/
│ ├── server_config.py
│ ├── start.py
├── .gitignore
├── requirements.txt
```
- app/: Contiene toda la lógica de la aplicación, incluyendo rutas, modelos, middleware, y utilidades.
- middleware/: Implementa el manejo de CORS (Cross-Origin Resource Sharing) y otras funciones intermedias.
- models/: Define los modelos de datos que se utilizan en la base de datos, como los modelos para currículums, términos y usuarios.
- routes/: Contiene las rutas de la API, cada una gestionando una parte específica del backend, como currículums, términos y usuarios.
- utils/: Almacena funciones utilitarias, como la gestión de tokens JWT.
- upload_files/: Directorio para almacenar archivos subidos, como imágenes.
- server_config.py: Configuración del servidor Uvicorn, como el host y el puerto.
- start.py: Script para iniciar el servidor backend.
- requirements.txt: Lista de dependencias del proyecto.

## Prerrequisitos para ejecutar el backend
- Python 3.7 o superior: Asegúrate de tener instalado Python en tu sistema.
- Pip: El gestor de paquetes de Python, necesario para instalar las dependencias..
- Un entorno virtual (recomendado para evitar conflictos de dependencias).

## Ejecución
1. **Crea y activa un entorno virtual:**
Dentro de cvboost-env ejecutar los siguientes comandos
```
python -m venv <Nombreentorno-env>
Activación del entorno virtual en Windows, ejecuta: <Nombreentorno-env>\Scripts\activate
Activación del entorno virtual en Unix o MacOS, ejecuta: source <Nombreentorno-env>/bin/activate
```
2. **Instala las dependencias**
Dentro de la carpeta raiz (cvboost-env) y con el entorno virtual activado ejecuta los siguientes comandos
```
pip install -r requirements.txt
```
3. **Ejecucion del backend del proyecto**
Una vez instaladas las dependencias (verificar su terminal) con el entorno encendido ejecutar los siguientes comandos
```
cd CVBackend
python start.py
```
Si todo está configurado correctamente, el backend debería estar ejecutándose.

## Configuración del Servidor
El archivo start.py se encarga de iniciar el servidor Uvicorn utilizando la configuración especificada en server_config.py. Puedes ajustar parámetros como el host, el puerto, y el modo de recarga en server_config.py para adaptarlo a tus necesidades.

## Base de Datos
El backend está configurado para conectarse a una base de datos MySQL. Es crucial que tengas MySQL instalado y operativo en tu sistema. La configuración de la base de datos, como las credenciales de conexión y el nombre de la base de datos, se debe especificar en el archivo database_config.py ubicado en la carpeta app.

## Tutorial para el Usuario
1. **Acceso a la API:** Una vez que el backend esté corriendo, puedes acceder a la documentación interactiva de la API a través de las siguientes URLs:
- http://tu-url-configurada/docs 
- http://tu-url-configurada/redoc.


## React-curriculum (front-end)
### Descripción
El frontend de CvBoost es una aplicación desarrollada con React Vite, un entorno de desarrollo rápido y moderno que optimiza el tiempo de compilación y proporciona una experiencia de desarrollo ágil. La interfaz de usuario se construye utilizando la plantilla AdminLTE 3 basada en bootstrap4, conocida por su diseño limpio y modular, ideal para aplicaciones administrativas.

## Tecnologías empleadas
- React: Una biblioteca de JavaScript para construir interfaces de usuario, especialmente para aplicaciones de una sola página.
- Vite: Un entorno de desarrollo rápido que proporciona un servidor de desarrollo con recarga instantánea y un sistema de construcción optimizado.
- JavaScript (ES6+): El lenguaje de programación utilizado para desarrollar la lógica del frontend.
- AdminLTE 3: Una plantilla de interfaz de usuario basada en Bootstrap 4, que ofrece un conjunto de componentes preconstruidos para desarrollar aplicaciones administrativas.
- Bootstrap 4: Un framework CSS que facilita el desarrollo de interfaces de usuario responsivas y estilizadas.
- Fontawesome 5.14: Biblioteca de iconos escalables y personalizables para utilizar en la interfaz de usuario.
- Google Fonts - Raleway: Fuente tipográfica utilizada para estilizar el texto de la aplicación.
- jQuery: Biblioteca de JavaScript rápida, pequeña y rica en características, usada para manipulación del DOM (usada por la plantilla AdminLTE3).
- AOS Animation on Scroll: Biblioteca para animaciones de desplazamiento, utilizada para agregar efectos visuales al interactuar con la página.
- html2pdf: Biblioteca utilizada para convertir HTML a PDF en el navegador.
- react-axios: Componente para realizar peticiones HTTP utilizando Axios en aplicaciones React.
- react-router-dom: Biblioteca para la gestión de rutas en aplicaciones React.

## Estructura del proyecto React
La estructura del proyecto front-end está organizada de la siguiente manera:
```
react-curriculum/
├── public/
│ ├── dist/
│ │ ├── css/
│ │ ├── img/
│ │ ├── js/
│ ├── plugins/
├── src/
│ ├── assets/
│ │ ├── img/
│ ├── components/
│ │ ├── common/
│ │ │ ├── PlantillasCV/
│ │ │ │ ├── CurriculumV.jsx
│ │ │ │ ├── CurriculumV2.jsx
│ │ │ ├── Callout.jsx
│ │ │ ├── Cardoverlay.jsx
│ │ │ ├── ColorPicker.jsx
│ │ │ ├── Preloader.jsx
│ │ │ ├── Slider.jsx
│ │ │ ├── Sweetalert2.jsx
│ │ ├── layout/
│ │ │ ├── footer/
│ │ │ │ ├── Footerhome.jsx
│ │ │ │ ├── Footer.jsx
│ │ │ ├── navbar/
│ │ │ │ ├── Navbar.jsx
│ │ │ │ ├── Navbarhome.jsx
│ │ │ ├── AsideBarOr.jsx
│ │ │ ├── PageHeader.jsx
│ │ ├── specific/
│ ├── context/
│ │ ├── ContextProvider.jsx
│ │ ├── curriculumContext.jsx
│ ├── helpers/
│ │ ├── authHelpers.jsx
│ │ ├── parseJWT.js
│ │ ├── pdfHelper.js
│ ├── pages/
│ │ ├── create-cv/
│ │ │ ├── choose-csv
│ │ │ │ ├── ChooseCSV.jsx
│ │ │ ├── sections
│ │ │ │ ├── FinishCV.jsx
│ │ │ │ ├── HeaderCV.jsx
│ │ │ │ ├── LanguagesCV.jsx
│ │ │ │ ├── SkillsCV.jsx
│ │ │ │ ├── StudiesCV.jsx
│ │ │ │ ├── WorkhistoryCV.jsx
│ │ │ ├── select-template
│ │ │ │ ├── SelectTemplate.jsx
│ │ │ ├── createCV.jsx
│ │ ├── home/
│ │ │ ├── Home.jsx
│ │ ├── login/
│ │ │ ├── Login.jsx
│ │ ├── register/
│ │ │ ├── Register.jsx
│ ├── routes/
│ │ │ ├── Router.jsx
│ ├── styles/
│ │ │ ├── Specific/
│ │ │ │ ├── Bannerheader.css
│ ├── utils/
│ │ │ ├── curriculums/
│ │ │ │ ├── curriculums.js
│ │ │ │ ├── dataTransformer.js
│ │ │ ├── RegisterLogin/
│ │ │ │ ├── RegisterLogin.js
│ │ │ ├── TermsAndConditions/
│ │ │ │ ├── Terms.js
│ │ │ ├── users/
│ │ │ │ ├── User.js
│ │ │ ├── plantillasConfig.jsx
│ ├── App.jsx
│ ├── main.jsx
├── test/
│ ├── utils/
│ │ │ ├── cv.test.js
│ │ │ ├── terms.test.js
│ │ │ ├── usuario.test.js
│ ├── demo.test.js
├── .eslintrc.cjs
├── .gitignore
├── babel.config.cjs
├── index.html
├── jest.config.cjs
├── jest.setup.js
├── package-lock.json
├── package.json
├── vite.config.js
```

## public/
En public contenemos la estructura de archivos y plugins necesarios para tener acceso a la plantilla Adminlte3:
- dist/: Contiene los archivos compilados y listos para producción, como CSS, imágenes y JavaScript de la plantilla Adminlte3.
- css/: Archivos de estilos CSS generados durante el proceso de construcción.
- img/: Imágenes utilizadas en la aplicación.
- js/: Archivos JavaScript generados durante la construcción.
- plugins/: Almacena plugins adicionales utilizados en el proyecto.

## src/
- assets/: Contiene recursos estáticos que se utilizan en la aplicación.
    - img/: Imágenes y otros recursos gráficos.
- components/: Incluye los componentes reutilizables de la aplicación.
    - common/: Componentes comunes que se pueden utilizar en diferentes partes de la aplicación.
        - PlantillasCV/: Componentes específicos para las plantillas de currículum.
            - CurriculumV.jsx: Componente para una plantilla de currículum específica.
            - CurriculumV2.jsx: Componente para otra variante de la plantilla de currículum.
        - Callout.jsx: Componente para mostrar llamadas de atención o alertas.
        - Cardoverlay.jsx: Componente para mostrar una tarjeta con superposición de contenido.
        - ColorPicker.jsx: Componente para seleccionar colores.
        - Preloader.jsx: Componente para mostrar un preloader o cargador de contenido.
        - Slider.jsx: Componente para mostrar un carrusel de imágenes o contenido.
        - Sweetalert2.jsx: Componente para mostrar alertas bonitas y personalizables.

    - layout/: Componentes que definen la estructura y disposición general de la aplicación.
        - footer/: Componentes para el pie de página.
            - Footerhome.jsx: Pie de página específico para la página de inicio.
            - Footer.jsx: Pie de página general para otras páginas.
        - navbar/: Componentes para la barra de navegación.
            - Navbar.jsx: Barra de navegación general.
            - Navbarhome.jsx: Barra de navegación específica para la página de inicio.
        - AsideBarOr.jsx: Barra lateral que muestra el progreso o información adicional.
        - PageHeader.jsx: Componente para mostrar el encabezado de una página.
    - specific/: Componentes específicos que no encajan en las otras categorías.

- context/: Archivos relacionados con la gestión del estado global utilizando Context API.
    - ContextProvider.jsx: Proveedor de contexto principal que envuelve la aplicación.
    - curriculumContext.jsx: Contexto específico para la gestión de los datos de currículum.

- helpers/: Funciones auxiliares que realizan tareas específicas.
    - authHelpers.jsx: Funciones relacionadas con la autenticación de usuarios.
    - parseJWT.js: Función para analizar y decodificar JWT.
    - pdfHelper.js: Función para generar PDFs a partir de contenido HTML.

- pages/: Contiene las páginas principales de la aplicación.
    - create-cv/: Páginas relacionadas con la creación de un currículum.
    - choose-csv/: Página para seleccionar el formato CSV.
    - ChooseCSV.jsx: Componente para elegir un archivo CSV.
    - sections/: Secciones que componen el currículum.
        - FinishCV.jsx: Página para finalizar la creación del currículum.
        - HeaderCV.jsx: Página para agregar el encabezado del currículum.
        - LanguagesCV.jsx: Página para agregar habilidades lingüísticas al currículum.
        - SkillsCV.jsx: Página para agregar habilidades al currículum.
        - StudiesCV.jsx: Página para agregar estudios al currículum.
        - WorkhistoryCV.jsx: Página para agregar la experiencia laboral.
        - select-template/: Página para seleccionar una plantilla de currículum.
            - SelectTemplate.jsx: Componente para seleccionar una plantilla.
        - createCV.jsx: Página principal para la creación de currículums.
    - home/: Página de inicio.
        - Home.jsx: Componente para la página de inicio.
    - login/: Página de inicio de sesión.
        - Login.jsx: Componente para la página de inicio de sesión.
    - register/: Página de registro de usuarios.
        - Register.jsx: Componente para la página de registro.

- routes/: Contiene las rutas principales de la aplicación.
    - Router.jsx: Componente que define las rutas de la aplicación.

- styles/: Archivos de estilos CSS.
    - Specific/: Estilos específicos para componentes o páginas.
        - Bannerheader.css: Estilos para el encabezado de banners.

- utils/: Funciones y configuraciones utilitarias que se utilizan en diferentes partes de la aplicación.
    - curriculums/: Funciones relacionadas con la gestión de currículums.
        - curriculums.js: Funciones generales para la manipulación de currículums.
        - dataTransformer.js: Función para transformar datos de currículum.
    - RegisterLogin/: Funciones utilitarias para el registro e inicio de sesión.
        - RegisterLogin.js: Funciones para manejar el registro e inicio de sesión de usuarios.
    - TermsAndConditions/: Funciones relacionadas con los términos y condiciones.
        - Terms.js: Funciones para gestionar términos y condiciones.
    - users/: Funciones relacionadas con la gestión de usuarios.
        - User.js: Funciones para manejar información de usuarios.
    - plantillasConfig.jsx: Configuración de las plantillas de currículum.

- App.jsx: Componente principal de la aplicación React.
- main.jsx: Punto de entrada de la aplicación donde se inicializa React.
- test/
    - utils/: Pruebas unitarias para funciones utilitarias.
        - cv.test.js: Pruebas para las funciones relacionadas con currículums.
        - terms.test.js: Pruebas para funciones de términos y condiciones.
        - usuario.test.js: Pruebas para las funciones relacionadas con usuarios.
    - demo.test.js: Pruebas de demostración para verificar la configuración de pruebas.

## Archivos de configuración y otros
- .eslintrc.cjs: Configuración de ESLint para mantener la calidad del código.
- .gitignore: Archivos y carpetas que Git debe ignorar.
- babel.config.cjs: Configuración de Babel para la transpilación de código JavaScript.
- index.html: Archivo HTML principal donde se monta la aplicación React.
- jest.config.cjs: Configuración de Jest para pruebas.
- jest.setup.js: Configuración inicial para Jest.
- package-lock.json: Archivo que asegura la instalación consistente de dependencias.
- package.json: Archivo que lista las dependencias del proyecto y scripts de npm.
- vite.config.js: Configuración de Vite para el desarrollo y la construcción de la aplicación.

# Prerrequisitos
Antes de ejecutar el proyecto front-end, asegúrate de tener instalado lo siguiente:
- Node.js: Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde nodejs.org.
- npm: npm se instala automáticamente con Node.js. Es el administrador de paquetes necesario para instalar las dependencias del proyecto.

## Ejecución del proyecto
1. Ingresar a la carpeta del proyecto react-curriculum
2. Instalar las dependencias:
Ejecuta el siguiente comando para instalar todas las dependencias necesarias para el proyecto.
```
npm install
```
3. Iniciar el servidor de desarrollo:
Una vez instaladas las dependencias, inicia el servidor de desarrollo con el siguiente comando:
```
npm run dev 
```

Esto debería iniciar el proyecto en modo desarrollo y abrirlo en tu navegador por defecto Asegurate de tener activado el proyecto backend para cumplir con la parte logica.


## Instalación de librerias para los test
Este apartado cuenta unicamente como documentacion ya que al usar el comando de instalacion de dependencias
`npm run dev` se instala en conjunto con el proyecto.
Jest es un marco de pruebas de JavaScript diseñado para garantizar la corrección del código en aplicaciones grandes.
1. Instalacion de jest
```
npm install --save-dev jest
```
2. Instalación Babel para usar Jest con JSX:
Babel se usa para transpilar el código JSX para que Jest pueda ejecutarlo.
```
npm install --save-dev babel-jest
@babel/core @babel/present-env
```
3. Instalación tipos para Jest:
```
npm install --save @types/jest
```
4. Instalación whatwg-fetch:
Esto añade soporte para fetch en el entorno de pruebas, simula llamadas a la API.
```
npm install whatwg-fetch --save
```
5. Instalación Testing Library para React:
La Testing Library se utiliza para realizar pruebas más centradas en la experiencia del usuario.
```
npm install --save-dev
@testing-library/react
```
6. Instalación jsdom:
jsdom proporciona un entorno DOM simulado en Node.js para que Jest pueda manejar elementos del DOM.
```
npm install jest-environment-jsdom
```
7. Instalación el preset de Babel para React:
Esto te permite escribir pruebas en JSX.
```
npm install --save-dev @babel/preset -react 
```

### Ejecución de pruebas
```
npm run test 
```

El comando npm run test se utiliza para ejecutar scripts de prueba definidos en el archivo package.json de un proyecto Node.js.

- npm: El administrador de paquetes de Node.js.
- run: Subcomando para ejecutar scripts.
- test: Nombre del script que se ejecutará, comúnmente utilizado para ejecutar pruebas automatizadas.

## Típos de Pruebas:
### Pruebas unitarias
- Verificar que la función de carga de archivos adjuntos funcione correctamente.
- Comprobar que la validación de campos obligatorios (nombre,etc.) se realice correctamente.

### Pruebas de integración
- Verificar que la integración con bases de datos externas funcione correctamente.
- Comprobar que la sincronización de datos entre diferentes secciones del CV se realicen correctamente.
- Probar que la función de generación de PDF para el CV funcione correctamente.

### Pruebas de sistema
- Verificar que el sistema permita a los usuarios registrarse y iniciar sesión correctamente.
- Comprobar que el sistema permita a los usuarios crear, editar,etc.Su CV correctamente.

### Pruebas de aceptación
- Verificar que el sistema cumpla con los requisitos de usabilidad y accesibilidad.
- Comprobar que el sistema permita a los usuarios visualizar y descargar CV.

## Lecciónes Aprendidas

Durante la elaboración de mi CV, he experimentado un crecimiento significativo, tanto en habilidades técnicas como en la gestión de proyectos personales. Desde el comienzo, comprendí la importancia de una planificación meticulosa y estructurada, lo que me permitió mantenerme enfocado en mis objetivos y optimizar la gestión de mi tiempo y recursos. La adopción de tecnologías avanzadas como React, Vite y Material-UI fue fundamental para crear un CV dinámico y visualmente atractivo, fortaleciendo mi capacidad para ofrecer una experiencia de usuario intuitiva y efectiva.

A lo largo del proceso, la constante iteración ha sido esencial para mejorar tanto el diseño como la funcionalidad del CV. Esta metodología ágil me permitió adaptarme rápidamente a los requisitos cambiantes, asegurando que cada sección del CV refleje fielmente mis habilidades y experiencia profesional.

El resultado se manifiesta no solo en la presentación profesional de mis habilidades técnicas y logros, sino también en mi capacidad para captar la atención de potenciales empleadores y colaboradores. Este proyecto ha sido más que una simple actualización de mi currículum; ha sido una experiencia transformadora que ha reforzado mi credibilidad profesional y mi preparación para enfrentar futuros desafíos en el competitivo mundo del desarrollo de software. Ahora, me siento más confiado en mi capacidad para abordar proyectos complejos y continuar ofreciendo soluciones innovadoras que aporten un valor significativo en este campo en constante evolución.

## Conclusión 
El proyecto de CV  representa una evolución significativa del currículum tradicional al proporcionar una plataforma interactiva y atractiva diseñada para desarrolladores de software. Esta herramienta no solo permite a los usuarios documentar y mostrar sus habilidades y logros de manera organizada, sino que también ofrece una experiencia personalizada e inmersiva, destacando sus fortalezas en un mercado laboral competitivo. Con una estructura optimizada y un diseño intuitivo, esta plataforma facilita la conexión entre desarrolladores y empleadores o clientes, abriendo nuevas oportunidades y retos en el mundo del desarrollo de software.