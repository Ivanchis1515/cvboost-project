from fastapi import FastAPI #importa fastapi
from CVBackend.app.middleware.CORS import add_middleware #middleware
from CVBackend.app.routes.user_routes import router as user_router #ruta usuarios
from CVBackend.app.routes.terms_routes import router as terms_router #ruta terminos y condiciones
from CVBackend.app.routes.curriculum_routes import router as cvs_router #ruta de curriculums.
from CVBackend.app.routes.utls_routes import router as utils_router #ruta de utilidades

app = FastAPI()

#middleware cors para permitir conexiones de otros entornos
add_middleware(app)

#incluir rutas
app.include_router(user_router, prefix="/users")
app.include_router(terms_router, prefix="/terms")
app.include_router(cvs_router, prefix="/cv")
app.include_router(utils_router, prefix="/utils")