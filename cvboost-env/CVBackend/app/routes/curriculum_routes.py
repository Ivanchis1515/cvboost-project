#importaciones necesarias
from fastapi import APIRouter, HTTPException, status #enrutador, excepcioneshhtp y status
from fastapi.responses import JSONResponse #respuestasjson
from app.database_config import get_database_connection #configuracion de bd
##importaciones complemento
from app.models.curriculums_model import CVUserCreate, UserInformationCreate, UserSectionRequest, UserEducationCreate

# Inicializa el enrutador de FastAPI
router = APIRouter()

#devuelve una plantilla
@router.get("/cvs/{template_name}")
def obten_plantilla(template_name: str):
    try:
        connection = get_database_connection()  #conecta a la base de datos
        cursor = connection.cursor(dictionary=True)  #obtener el resultado como un diccionario

        #consulta SQL para obtener el CV por nombre de plantilla
        query = "SELECT id FROM cvs WHERE template_name = %s"
        cursor.execute(query, (template_name,))
        cv = cursor.fetchone()  #selecciona el primer registro que coincida

        #si no se encuentra el CV lanzar una excepcion
        if not cv:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Template not found")

        #retornar los datos del CV encontrado
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=cv
        )

    except Exception as err:
        print(f"Error: {err}") #depuración
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
        connection.close()

#endpoint para crear la opcion del usuario
@router.post("/cvuser")
def create_cvuser(cv_user: CVUserCreate):
    connection = get_database_connection() #obtener conexion a la base de datos
    cursor = connection.cursor()

    try:
        #verificar si el usuario existe
        cursor.execute("SELECT id FROM Users WHERE id = %s", (cv_user.user_id,))
        user = cursor.fetchone() #selecciona un unico registro
        #si el usuario no existe
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

        #insertar los datos en la tabla CVUser
        insert_query = """INSERT INTO CVUser (user_id, cv_id, template_name, color, created_at, updated_at) VALUES (%s, %s, %s, %s, Now(), Now())"""
        cursor.execute(insert_query, (cv_user.user_id, cv_user.cv_id, cv_user.template_name, cv_user.color))
        connection.commit()

        #obtener el ID del currículum recien creado
        created_cv_id = cursor.lastrowid

        #retornar la respuesta personalizada con status 200
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "id": created_cv_id,
                "msg": "Documento agregado",
            }
        )

    except Exception as err:
        print(f"Error: {err}")#depuracion
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
        connection.close()

#endpoint para verificar en que tablas el usuario tiene informacion
@router.post("/user-sections")
async def check_user_sections(request: UserSectionRequest):
    connection = get_database_connection() #obtener la conexion a la base de datos
    cursor = connection.cursor(dictionary=True) #devuelve el resultado como diccionario
    
    try:
        results = {}
        
        for table in request.tables:
            #comprobar si la tabla existe
            cursor.execute("SHOW TABLES LIKE %s", (table,))
            if not cursor.fetchone():
                raise HTTPException(status_code=400, detail=f"Tabla '{table}' no existe")

            #consultar la tabla para verificar si el usuario ha completado la informacion
            query = f"SELECT COUNT(*) AS count FROM {table} WHERE cvid_user_template = %s"
            cursor.execute(query, (request.user_id,))
            result = cursor.fetchone()
            results[table] = result['count'] > 0  #devuelve True si hay registros False en caso contrario

        return JSONResponse(
            status_code=200,
            content={"status": results}
        )

    except Exception as err:
        print(f"Error: {err}")  #depuracion
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
        connection.close()

#endpoint para buscar informacion en las tablas completadas
@router.post("/user-data")
async def get_user_data(request: UserSectionRequest):
    connection = get_database_connection() #obten la conexion a la base de datos
    cursor = connection.cursor(dictionary=True) #devuelve los datos como diccionario
    
    try:
        results = {}

        for table in request.tables:
            #comprobar si la tabla existe
            cursor.execute("SHOW TABLES LIKE %s", (table,))
            if not cursor.fetchone():
                raise HTTPException(status_code=400, detail=f"Table '{table}' does not exist")

            #consultar la tabla para obtener los datos del usuario
            query = f"SELECT * FROM {table} WHERE cvid_user_template = %s"
            cursor.execute(query, (request.user_id,))
            data = cursor.fetchall()

            if data:
                results[table] = data
            else:
                results[table] = "No data available"

        return JSONResponse(
            status_code=200,
            content={"data": results}
        )

    except Exception as err:
        print(f"Error: {err}")  #depuracion
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
        connection.close()

#ruta para guardar la informacion del usuario
@router.post("/userinformation")
async def create_user_information(user_info: UserInformationCreate):
    connection = get_database_connection() #conecta a la base de datos
    cursor = connection.cursor() #obten el cursor

    try:
        insert_query = """
            INSERT INTO UserInformation 
            (cvid_user_template, id_user, name, surname, city, municipality, address, colony, postal_code, phone, email, photo) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (
            user_info.cvid_user_template, #id del documento en edicion
            user_info.id_user, #id usuario
            user_info.name, #nombre de la plantilla
            user_info.surname, #apellido
            user_info.city, #ciudad
            user_info.municipality, #municipio
            user_info.address, #direccion
            user_info.colony, #colonia
            user_info.postalCode, #codigo postal
            user_info.phone, #telefono
            user_info.email, #correo
            user_info.photo  #nombre del archivo de la foto
        ))
        connection.commit() #ejecuta la consulta

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "Información insertada"}
        )

    except Exception as err:
        print(f"Error: {err}") #depuracion
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close() #cierra el cursor
        connection.close() #cierra la conexion a la base

#ruta para guardar los detalles academicos
@router.post("/user-education")
def create_user_education(user_education: UserEducationCreate):
    connection = get_database_connection()  # obten la conexion a la base de datos
    cursor = connection.cursor()  # obten el cursor

    try:
        #convertir el valor de end_date si es 'Actual'
        end_date = None if user_education.currentlyStudying == 1 else user_education.endDate

        #insertar datos en la tabla UserEducation
        insert_query = """
            INSERT INTO usereducation 
            (cvid_user_template, user_id, school, city_school, certification, field_of_study, start_date, end_date, currently_studying)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (
            user_education.cvid_user_template,
            user_education.user_id,
            user_education.school,
            user_education.citySchool,
            user_education.certification,
            user_education.fieldOfStudy,
            user_education.startDate,
            end_date,
            user_education.currentlyStudying
        ))
        #obtener el ID de la ultima fila insertada
        inserted_id = cursor.lastrowid

        #consultar el registro insertado
        select_query = """
            SELECT * FROM usereducation WHERE id = %s
        """
        cursor.execute(select_query, (inserted_id,))
        new_record = cursor.fetchone()  #obtener el nuevo registro

        #convertir las fechas a formato ISO para la serializacion JSON
        if new_record:
            new_record = {
                "id": new_record[0],
                "cvid_user_template": new_record[1],
                "user_id": new_record[2],
                "school": new_record[3],
                "city_school": new_record[4],
                "certification": new_record[5],
                "field_of_study": new_record[6],
                "start_date": new_record[7].isoformat() if new_record[7] else None,
                "end_date": new_record[8].isoformat() if new_record[8] else None,
                "currently_studying": new_record[9]
            }
        connection.commit()

        #si todo es correcto enviar un mensaje y estado
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "Campo de estudio agregado exitosamente",
                "content": new_record  #devolver el nuevo registro
            }
        )

    except Exception as err:
        print(f"Error: {err}") #depuracion
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
        connection.close()

#ruta para actualizar los detalles academicos
@router.put("/update-education")
def update_user_education(user_education: UserEducationCreate):
    connection = get_database_connection()  #obtener la conexion a la base de datos
    cursor = connection.cursor()  #obtener el cursor

    try:
        #consultar si el registro existe
        select_query = "SELECT * FROM usereducation WHERE id = %s"
        cursor.execute(select_query, (user_education.id,)) #ejecuta la consulta
        existing_record = cursor.fetchone()

        if not existing_record:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Registro no encontrado")

        #actualizar datos en la tabla UserEducation
        update_query = """
            UPDATE usereducation
            SET 
                cvid_user_template = %s,
                user_id = %s,
                school = %s,
                city_school = %s,
                certification = %s,
                field_of_study = %s,
                start_date = %s,
                end_date = %s,
                currently_studying = %s
            WHERE id = %s
        """
        cursor.execute(update_query, (
            user_education.cvid_user_template,
            user_education.user_id,
            user_education.school,
            user_education.citySchool,
            user_education.certification,
            user_education.fieldOfStudy,
            user_education.startDate,
            user_education.endDate,
            user_education.currentlyStudying,
            user_education.id  # ID del registro a actualizar
        ))
        connection.commit()

        #consultar el registro actualizado
        select_query = "SELECT * FROM usereducation WHERE id = %s"
        cursor.execute(select_query, (user_education.id,))
        updated_record = cursor.fetchone() #extrae unicamente el registro

        #convertir las fechas a formato ISO para la serializacion JSON
        if updated_record:
            updated_record = {
                "id": updated_record[0],
                "cvid_user_template": updated_record[1],
                "user_id": updated_record[2],
                "school": updated_record[3],
                "city_school": updated_record[4],
                "certification": updated_record[5],
                "field_of_study": updated_record[6],
                "start_date": updated_record[7].isoformat() if updated_record[7] else None,
                "end_date": updated_record[8].isoformat() if updated_record[8] else None,
                "currently_studying": updated_record[9]
            }

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "Campo de estudio actualizado exitosamente",
                "content": updated_record  #devolver el registro actualizado
            }
        )

    except Exception as err:
        print(f"Error: {err}")  #depuración
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
        connection.close()

@router.delete("/delete-education/{id}")
def delete_user_education(id: int):
    connection = get_database_connection() #obtener la conexion a la base de datos
    cursor = connection.cursor() #obtener el cursor

    try:
        #consultar si el registro existe
        select_query = "SELECT * FROM usereducation WHERE id = %s"
        cursor.execute(select_query, (id,)) #ejecutar la consulta
        existing_record = cursor.fetchone() #elegir el registro

        if not existing_record:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Registro no encontrado") #sino existe manda un mensaje

        #eliminar el registro de la tabla UserEducation
        delete_query = "DELETE FROM usereducation WHERE id = %s"
        cursor.execute(delete_query, (id,)) #ejecutar la consulta
        connection.commit()

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "Campo de estudio eliminado"
            }
        )

    except Exception as err:
        print(f"Error: {err}") #depuracion
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
        connection.close()