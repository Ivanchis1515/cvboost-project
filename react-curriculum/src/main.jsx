//importaciones de react
import React from 'react'

//manipulacion del dom de reac
import ReactDOM from 'react-dom/client'

//importacion del rutas
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)