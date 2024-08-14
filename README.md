# CvBoost Backend

## Institución 

 Universidad Tecnológica De Puebla


 Tecnologías de la Información Ingeniería en Desarrollo y Gestión De Software

### Equipo de trabajo 
Hernández Velázquez Jorge Ivan UTP0151511


Salas Amaro Nidian	UTP0149290


Alarcon Briones Jose Alejandro UTP0149700


Jose Angel Luna Sedeño UTP0149900



### Datos docente
Materia:Desarrollo Web Integral


Profesor: Paulo Daniel Vázquez Mora


9º ” A”


## Descripción

CvBoost Backend es un proyecto de backend construido con FastAPI, diseñado para gestionar plantillas de currículum en línea. Este backend está estructurado para ofrecer una solución escalable y modular, permitiendo la integración de diferentes rutas, modelos, middleware y servicios. Está configurado para facilitar el desarrollo con recarga automática para una experiencia de desarrollo más fluida.

## Descripción del Proyecto
El proyecto de CV tiene como finalidad desarrollar una plataforma digital que vaya más allá del currículum tradicional. En lugar de ser simplemente un documento estático, esta plataforma será un entorno interactivo y visualmente atractivo, diseñado específicamente para desarrolladores de software. Aquí, los usuarios podrán documentar y mostrar sus habilidades, proyectos y logros de manera organizada y eficiente.

La estructura del CV incluirá secciones claves como experiencia laboral, habilidades técnicas, educación y portafolio de proyectos, cada una optimizada para resaltar las fortalezas individuales. La interfaz permitirá a los usuarios personalizar su presentación, integrando elementos visuales y multimedia que muestren su trabajo de una manera más inmersiva.

El diseño de la plataforma está pensado para ser intuitivo y accesible, facilitando la navegación tanto para los desarrolladores que lo construyen como para los empleadores o clientes que lo revisan. Con esta herramienta, se busca no solo presentar un perfil profesional completo, sino también destacar de manera diferenciada en un mercado laboral competitivo, maximizando las oportunidades para conectar con nuevas oportunidades y desafíos en el mundo del desarrollo de software.

## Objetivos Generales:
- Crear una plataforma digital estructurada y visualmente atractiva: El CV digital debe ser intuitivo, fácil de navegar y reflejar un diseño moderno que capte la atención de potenciales empleadores o clientes.
- Documentar y presentar habilidades, proyectos y logros: El objetivo es proporcionar un medio para que los usuarios muestren su experiencia de manera clara, detallada y profesional.
- Ofrecer una experiencia interactiva: Incorporar funcionalidades que permitan a los usuarios personalizar su CV, integrando multimedia, enlaces a proyectos, y otros elementos interactivos que mejoren la presentación de su perfil.


## Objetivos Específicos:
- Desarrollar un sistema de plantillas personalizables: Permitir a los usuarios elegir y modificar temas de color, tipografías y Layouts para que el CV se ajuste a su estilo personal.
- Implementar una gestión de contenido eficiente: Facilitar la entrada y actualización de información como experiencia laboral, habilidades técnicas, educación y logros.
- Integración con plataformas externas: Permitir la inclusión de enlaces a GitHub, LinkedIn, portafolios, blogs u otros sitios relevantes.
- Optimizar para diferentes dispositivos: Asegurar que el CV digital sea completamente responsivo, ofreciendo una experiencia óptima en dispositivos móviles, tabletas y escritorios.

## Alcance Funcional:
- Estructura del CV: Incluir secciones predefinidas como experiencia, educación, habilidades y contactos, con la posibilidad de añadir secciones personalizadas.
- Personalización del Diseño: Implementar opciones para que los usuarios puedan modificar colores, fuentes, y Layouts de acuerdo a su preferencia.
- Soporte Multilingüe: Opcionalmente, incluir la capacidad de crear y mostrar el CV en diferentes idiomas.
- Interactividad: Agregar funcionalidades interactivas como animaciones, transiciones suaves, y la posibilidad de incluir videos o presentaciones.


## PREREQUISITOS

### Frontend:
- Dominio de HTML, CSS, y JavaScript para la creación de una interfaz de usuario responsiva y atractiva.
- Familiaridad con frameworks de frontend como Angular, React o Vue.js para una mejor gestión del estado y componentes dinámicos.
### Backend:
- Conocimiento en Flask o Django para manejar la lógica del servidor, APIs y la interacción con bases de datos.
- Familiaridad con RESTful APIs para la comunicación entre frontend y backend.
### DevOps:
- Conocimiento en Git y control de versiones para gestionar el código de manera efectiva.
- Experiencia en despliegue en la nube (AWS, Heroku, etc.) para alojar el CV digital.

 ### Diseño y UX/UI:
- Habilidades en diseño gráfico para crear una interfaz visualmente atractiva.
- Conocimiento de principios de UX/UI para asegurar una experiencia de usuario intuitiva y agradable.
- Uso de herramientas de diseño como Figma para prototipos y maquetas.

### Contenido y Estrategia:
- Redacción técnica para elaborar descripciones claras y concisas de habilidades y proyectos.
- Gestión de contenido para organizar y estructurar la información de manera lógica y atractiva.


### Pruebas de Testing 
- Se realizaron pruebas de testing para asegurarse de que el proyecto funcione correctamente.
- Se utilizó un test suite que cubre todas las funcionalidades del proyecto.
- Para ejecutar las pruebas, se debe correr el comando 


npm run test 


- En la terminal, estando en la carpeta del proyecto.




Consideraciones de Seguridad:



- Implementación de mejores prácticas de seguridad para proteger los datos personales del usuario.
- Conocimiento en autenticación y autorización para controlar el acceso a la plataforma.
- Habilidad para crear documentación clara y completa que detalle el uso y mantenimiento del CV digital.



## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:
```
CVBackend/
│
├── app/
│ ├── init.py
│ ├── main.py
│ ├── config.py
│ ├── routes/
│ │ ├── init.py
│ │ ├── user_routes.py
│ ├── models/
│ │ ├── init.py
│ │ ├── user_model.py
│ │ └── ... # Otros archivos de modelos
│ ├── middleware/
│ │ ├── init.py
│ │ ├── auth_middleware.py
│ │ └── ... # Otros archivos de middleware
├── server_config.py
├── start.py
├── requirements.txt
└── README.md
```


## Tecnologías Empleadas

- **FastAPI**: Un framework moderno y rápido para construir APIs con Python 3.7+ basado en tipos de datos estándar de Python.
- **Uvicorn**: Un servidor ASGI para correr aplicaciones web Python.
- **Pydantic**: Para validación de datos y configuración en la aplicación.
- **mysql-connector-python**: Para conectividad con bases de datos MySQL.
- **PyJWT**: Para la gestión de tokens JWT.
- **Python 3.x**: El lenguaje de programación utilizado.
- **Figma**: Para prototipos de alta fidelidad
- **React y Vite**: Desarrollo frontend
- **HTML**: Se utiliza para estructurar el contenido del CV como   encabezados, párrafos, listas y enlaces.
- **MySQL**: Base de datos relacionales que se pueden usar para almacenar información más estructurada.


## Prerrequisitos

- Python 3.7 o superior.
- Pip para la gestión de paquetes.
- Un entorno virtual (recomendado para evitar conflictos de dependencias).

## Instalación
1. **Crea y activa un entorno virtual:**
```
python -m venv <Nombreentorno-env>
Activación del entorno virtual en Windows, ejecuta: fastapi-env\Scripts\activate
Activación del entorno virtual en Unix o MacOS, ejecuta: source fastapi-env/bin/activate
```
2. **Clona el repositorio:**
   ```bash
   git clone CVBackend
   cd <NOMBRE_DEL_REPOSITORIO>
   ```
3. **Instala las dependencias**
```
pip install -r requirements.txt
```
4. **Ejecuta el proyecto**
```
cd CVBackend
python start.py
```



## Configuración del Servidor
El archivo start.py se encarga de iniciar el servidor Uvicorn con la configuración especificada en server_config.py. Puedes ajustar la configuración del servidor, como el host, el puerto y el modo de recarga, directamente en server_config.py.


## Base de Datos
El proyecto está configurado para conectarse a una base de datos MySQL. Asegúrate de que MySQL esté instalado y funcionando. La configuración de la base de datos debe especificarse en config.py en la carpeta app.


## Tutorial para el Usuario
1. **Acceso a la API:** Una vez que el backend esté corriendo, puedes acceder a la documentación interactiva de la API en http://127.0.0.1:8000/docs o la alternativa en http://127.0.0.1:8000/redoc.


## Librerías 



- **React:** Biblioteca principal para construir la interfaz de usuario.
Copiar código
- npm install react react-dom


- **Vite:**  Herramienta de desarrollo rápido para React, que mejora los tiempos de carga y ofrece una configuración más sencilla.
Copiar código
- npm create vite@latest my-cv --template react


- **Material-UI (MUI):** Biblioteca de componentes de interfaz de usuario que proporciona componentes preconstruidos y personalizables para React.
Copiar código
- npm install @mui/material @emotion/react @emotion/styled


- **React Router:** Para gestionar la navegación entre las diferentes secciones del CV.
Copiar código
- npm install react-router-dom


- **Dnspython:** Es una librería que te permite realizar consultas DNS de manera sencilla en Python. Puedes consultar registros A, MX, TXT, y más
Copiar código
- pip install dnspython


- **Uvicorn**:Mejor enfoque en la simplicidad, rendimiento y escalabilidad.
Copiar código
- uvicorn main:app --reload



## Típos de Pruebas:


Pruebas unitarias



- Verificar que la función de carga de archivos adjuntos funcione correctamente.
- Comprobar que la validación de campos obligatorios (nombre,etc.) se realice correctamente.
- Probar que la función de autocompletado de habilidades o experiencia laboral funcione correctamente.





Pruebas de integración



- Verificar que la integración con bases de datos externas funcione correctamente.
- Comprobar que la sincronización de datos entre diferentes secciones del CV se realice correctamente.
- Probar que la función de generación de PDF de la impresión del CV funcione correctamente.



Pruebas de sistema



- Verificar que el sistema permita a los usuarios registrarse y iniciar sesión correctamente.
- Comprobar que el sistema permita a los usuarios crear, editar y eliminar CVs correctamente.
- Probar que el sistema permita seleccionar diferente plantilla de acuerdo a su preferencia.



Pruebas de aceptación

- Verificar que el sistema cumpla con los requisitos de usabilidad y accesibilidad.
- Comprobar que el sistema permita a los usuarios visualizar y descargar CV 




## Lecciónes Aprendidas


Durante la elaboración de mi CV, he experimentado un crecimiento significativo, tanto en habilidades técnicas como en la gestión de proyectos personales. Desde el comienzo, comprendí la importancia de una planificación meticulosa y estructurada, lo que me permitió mantenerme enfocado en mis objetivos y optimizar la gestión de mi tiempo y recursos. La adopción de tecnologías avanzadas como React, Vite y Material-UI fue fundamental para crear un CV dinámico y visualmente atractivo, fortaleciendo mi capacidad para ofrecer una experiencia de usuario intuitiva y efectiva.


A lo largo del proceso, la constante iteración ha sido esencial para mejorar tanto el diseño como la funcionalidad del CV. Esta metodología ágil me permitió adaptarme rápidamente a los requisitos cambiantes, asegurando que cada sección del CV refleje fielmente mis habilidades y experiencia profesional.


El resultado se manifiesta no solo en la presentación profesional de mis habilidades técnicas y logros, sino también en mi capacidad para captar la atención de potenciales empleadores y colaboradores. Este proyecto ha sido más que una simple actualización de mi currículum; ha sido una experiencia transformadora que ha reforzado mi credibilidad profesional y mi preparación para enfrentar futuros desafíos en el competitivo mundo del desarrollo de software. Ahora, me siento más confiado en mi capacidad para abordar proyectos complejos y continuar ofreciendo soluciones innovadoras que aporten un valor significativo en este campo en constante evolución.


## Conclusión 


El proyecto de CV digital representa una evolución significativa del currículum tradicional al proporcionar una plataforma interactiva y atractiva diseñada para desarrolladores de software. Esta herramienta no solo permite a los usuarios documentar y mostrar sus habilidades y logros de manera organizada, sino que también ofrece una experiencia personalizada e inmersiva, destacando sus fortalezas en un mercado laboral competitivo. Con una estructura optimizada y un diseño intuitivo, esta plataforma facilita la conexión entre desarrolladores y empleadores o clientes, abriendo nuevas oportunidades y retos en el mundo del desarrollo de software.


