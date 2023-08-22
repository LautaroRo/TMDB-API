import './App.css';
import Header from './Components/Header';
import Inicio from './Components/Inicio';
import Main from './Components/Main';
import NavBar from './Components/NavBar';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Perfiles from './Components/Perfiles';
import Peilculas from './Components/Peliculas';
import Perfil from "./Context/Perfil";
function App() {
  return (
    <Perfil>
      <BrowserRouter>
        <div className='body'>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path="/ruta/:name" element={<Perfiles />} />
            <Route path='/inicio' element={<Main />} />
            <Route path='/Pelicula/:name' element={<Peilculas />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Perfil>


  );
}

export default App;
