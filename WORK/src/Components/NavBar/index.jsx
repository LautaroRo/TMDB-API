import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./estilos.css"
import { Use } from '../../Context/Perfil'
const NavBar = () => {

    const {setPeliBuscar,setChange} = useContext(Use)
    const [scrolled, setScrolled] = useState(false);
    const [Perfil, setPerfil] = useState([])
    const [Estado, setEstado] = useState(false)
    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";

    useEffect(() => {
        const buscarPerfil = JSON.parse(localStorage.getItem("Perfil-Iniciado"));
        setPerfil(buscarPerfil)
    }, [])

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


        const traerPeloiculas = async (pelicula) => {
            const url = `${API}/search/movie?api_key=${API_KEY}&query=${pelicula}`;
            const response = await fetch(url);
            const data = await response.json();
            let informacion = []
            for(let i = 0; data.results.length > i; i++){
                if(data.results[i].original_language === "en" && data.results[i].poster_path !== undefined && data.results[i].poster_path !== null){
                    let info = {
                        name:data?.results[i]?.title,
                        imagen:`https://image.tmdb.org/t/p/w500/${data?.results[i]?.poster_path}`,
                        id:data?.results[i]?.id
                    }
                    informacion.push(info)
                }
            }
            const urlSerie = `${API}/search/tv?api_key=${API_KEY}&query=${pelicula}`;
            const responseSerie = await fetch(urlSerie);
            const dataSerie = await responseSerie.json();
            console.log(dataSerie, "hola")
            for(let i = 0; dataSerie?.results?.length > i; i++){
                if(dataSerie.results[i].original_language === "en" && dataSerie.results[i].poster_path !== undefined && dataSerie.results[i].poster_path !== null){
                    let info = {
                        name:dataSerie?.results[i]?.title,
                        imagen:`https://image.tmdb.org/t/p/w500/${dataSerie?.results[i]?.poster_path}`,
                        id:dataSerie?.results[i]?.id
                    }
                    informacion.push(info)
                }
            }
            setPeliBuscar(informacion)


        }



    const buscar = (e) => {
        e.preventDefault()
        if(e.target.value.length > 2){
            traerPeloiculas(e.target.value)
            setChange(e.target.value)
        }else{
            setPeliBuscar([])
        }

        
    }
    return (
        <header className={scrolled ? "navbar scrolled" : "navbar"}>
            <nav>
                <h2>Pelis</h2>
                <ul>
                    <li><a className='links' href="#">Inicio</a></li>
                    <li><a className='links' href="#">Acerca</a></li>
                    <li><a className='links' href="#">Servicios</a></li>
                </ul>

                <div className='divRight'>
                    {
                        Estado === false

                            ?
                            <FontAwesomeIcon onClick={() => setEstado(true)} icon={faMagnifyingGlass} className='iconoSearch'></FontAwesomeIcon>
                            :
                            <input onBlur={() => setEstado(false)} onChange={buscar} type="search" className='input' placeholder='Titulos' />

                    }
                    <img className='imagenPerfil' src={Perfil[0]?.imagen} alt="" />
                </div>
            </nav>
        </header>
    )
}

export default NavBar