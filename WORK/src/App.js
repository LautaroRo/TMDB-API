import './App.css';
import Header from './Components/Header';
import Inicio from './Components/Inicio';
import Main from './Components/Main';
import NavBar from './Components/NavBar';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Profile from "./Context/Profile"
import Perfiles from './Components/Perfiles';
function App() {
  return (
    <Profile>
      <BrowserRouter>
        <div className='body'>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path="/ruta/:name" element={<Perfiles/>}/>
            <Route path='/inicio' element={<Main />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Profile>


  );
}

export default App;
