from pydantic import BaseModel #basemodel
from typing import Union, List, Optional #indica que el atributopuede ser de más de un tipo
from datetime import date #clase clima

#modelo para recibir las solicitudes de informacion
class UserSectionRequest(BaseModel):
    user_id: int
    tables: List[str]

#modelo para crear un cv editable
class CVUserCreate(BaseModel):
    id: Optional[int] = None  # ID del registro a actualizar
    user_id: int
    cv_id: int
    template_name: str
    color: str

#modelo para guardar informacion personal
class UserInformationCreate(BaseModel):
    id: Optional[int] = None  # ID del registro a actualizar
    cvid_user_template: int
    id_user: int
    name: str
    surname: str
    ocupation: str
    personalDescription: str
    city: str
    municipality: str
    address: str
    colony: str
    postalCode: int
    phone: str
    email: str
    photo: Union[str, None] = None  #agregamos el campo photo opcional

#modelo para guardar educacion del usuario
class UserEducationCreate(BaseModel):
    id: Optional[int] = None  # ID del registro a actualizar
    cvid_user_template: Optional[int]
    user_id: Optional[int]
    school: Optional[str]
    citySchool: Optional[str]
    certification: Optional[str]
    fieldOfStudy: Optional[str]
    startDate: Optional[date]
    endDate: Optional[date] = None
    currentlyStudying: Optional[int]

#modelo para guardar la experiencia del usuario
class UserWorkExperienceCreate(BaseModel):
    id: Optional[int] = None #id del registro a actualizar
    user_id: Optional[int] 
    cvid_user_template: Optional[int]
    position: Optional[str]
    company: Optional[str]
    workCity: Optional[str]
    workMunicipality: Optional[str]
    workStartDate: Optional[date]  #formato YYYY-MM-DD
    workEndDate: Optional[date] = None 
    currentlyWorking: Optional[int]
    Workactivities: Optional[List[str]]  #array de actividades

#modelo para guardar aptitudes
class UserSkills(BaseModel):
    id: Optional[int] = None #id del registro a actualizar
    user_id: Optional[int]
    cvid_user_template: Optional[int]
    skill: Optional[str]

#modelo para guardar idiomas
class UserLanguages(BaseModel):
    id: Optional[int] = None
    user_id: Optional[int]
    cvid_user_template: Optional[int]
    language: Optional[str]
    level: Optional[int] = None