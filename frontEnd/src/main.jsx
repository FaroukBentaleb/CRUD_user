import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/homePage.jsx';
import Create from './components/Create.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Update from './components/Update.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/New' element={<Create/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Update/:id' element={<Update/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
