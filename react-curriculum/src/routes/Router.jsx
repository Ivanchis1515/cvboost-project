//importaciones de react
import React from 'react';

//importacion del enrutador de react
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importacion de las interfaces para las rutas
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import CreateCV from '../pages/create-cv/CreateCV';
import ChooseCSV from '../pages/create-cv/choose-csv/ChooseCSV';
import SelectTemplate from '../pages/create-cv/select-template/SelectTemplate';
import HeaderCV from '../pages/create-cv/sections/HeaderCV';
import StudiesCV from '../pages/create-cv/sections/StudiesCV';
import WorkhistoryCV from '../pages/create-cv/sections/WorkhistoryCV';
import SkillsCV from '../pages/create-cv/sections/SkillsCV';
import LanguagesCV from '../pages/create-cv/sections/LanguagesCV';
import FinishCV from '../pages/create-cv/sections/FinishCV';
import Counter from '../pages/example/Counter';

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/register' element={ <Register /> } />
                    <Route path='/login' element={ <Login /> } />
                    <Route path='/create-csv' element={ <CreateCV /> } />
                    <Route path='/create-csv/experience' element={ <ChooseCSV/> } />
                    <Route path='/create-csv/select-template' element={ <SelectTemplate/> } />
                    <Route path='/create-csv/section/headerCV' element={ <HeaderCV /> } />
                    <Route path='/create-csv/section/studies' element={ <StudiesCV /> } />
                    <Route path='/create-csv/section/workhistory' element={ <WorkhistoryCV /> } />
                    <Route path='/create-csv/section/skills' element={ <SkillsCV /> } />
                    <Route path='/create-csv/section/languages' element={ <LanguagesCV /> } />
                    <Route path='/create-csv/finish' element={ <FinishCV /> } />
                    <Route path='/Counter' element={ <Counter /> } />
                </Routes>
            </BrowserRouter>
        </>        
    )
}
export default Router