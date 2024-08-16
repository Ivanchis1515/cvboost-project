#importaciones necesarias
from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Request #enrutador, excepcioneshhtp y status
from fastapi.responses import JSONResponse, FileResponse #respuestasjson
#importaciones complemento
import os #libreria de sistema
import uuid #caracteres unicos

#crear un enrutador
router = APIRouter() #enrutador

UPLOAD_DIRECTORY = "./uploaded_files/images" #ubicacion para almacenar fotografias
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True) #crea el directorio si no existe

#sube una fotografia
@router.post("/upload")
async def upload_file(request: Request, file: UploadFile = File(None)):
    if file is None:
        return JSONResponse( status_code=200, content={"filename": None})

    try:
        #obtener el FormData del request
        form_data = await request.form()
        username = form_data.get('username', '')

        #eliminar espacios del nombre de usuario si se proporciona
        if username:
            username = username.replace(' ', '')

        #crear un nombre unico para el archivo
        file_extension = file.filename.split('.')[-1]  #obtener la extension del archivo
        unique_filename = f"{username}_{uuid.uuid4().hex}.{file_extension}" #crear el nombre del archivo
        file_path = os.path.join(UPLOAD_DIRECTORY, unique_filename) #ubicacion del archivo

        #guardar el archivo en el servidor
        with open(file_path, "wb") as f:
            f.write(await file.read())

        #devuelve una respuesta
        return JSONResponse(
            status_code=200,
            content={"filename": unique_filename}
        )

    except Exception as err:
        print(f"Error: {err}") #depuración
        raise HTTPException(status_code=500, detail=f"Error saving file: {err}")
    
#obten la fotografia
@router.get("/photo/{filename}")
async def get_photo(filename: str):
    file_path = os.path.join(UPLOAD_DIRECTORY, filename)
    if os.path.exists(file_path):
        headers = {"Access-Control-Allow-Origin": "http://localhost:5173"}
        return FileResponse(file_path, headers=headers)

    else:
        raise HTTPException(status_code=404, detail="Photo not found")

#elimina la fotografia
@router.delete("/photo/{filename}")
async def delete_photo(filename: str):
    file_path = os.path.join(UPLOAD_DIRECTORY, filename)
    
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
            headers = {"Access-Control-Allow-Origin": "http://localhost:5173"}
            return JSONResponse(
                status_code=200,
                content={"message": f"Photo '{filename}' deleted successfully"},
                headers=headers
            )
        except Exception as err:
            print(f"Error: {err}")  # Depuración
            raise HTTPException(status_code=500, detail=f"Error deleting photo: {err}")
    else:
        raise HTTPException(status_code=404, detail="Photo not found")