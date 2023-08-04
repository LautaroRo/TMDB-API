import React, { useEffect, useState } from 'react'
import "./estilos.css"
const NavBar = () => {

    const [scrolled, setScrolled] = useState(false);
    const [Perfil,setPerfil] = useState([])
    useEffect(()=>{
        const buscarPerfil = JSON.parse(localStorage.getItem("Perfil-Iniciado"));
        setPerfil(buscarPerfil)
    },[])
    useEffect(()=>{
        console.log(Perfil[0])
    },[Perfil])
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
    }, []);
    return (
        <header className={scrolled ? "navbar scrolled" : "navbar"}>
            <nav>
            <h2>Pelis</h2>
                <ul>
                    <li><a className='links' href="#">Inicio</a></li>
                    <li><a className='links' href="#">Acerca</a></li>
                    <li><a className='links' href="#">Servicios</a></li>
                    <li><a className='links' href="#">Contacto</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar