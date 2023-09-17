import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTrash, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import "./estilos.css"
import { Use } from '../../Context/Perfil'
import { NavLink } from 'react-router-dom'
const NavBar = () => {

    const { setPeliBuscar, setChange, change } = useContext(Use)
    const [scrolled, setScrolled] = useState(false);
    const [Perfil, setPerfil] = useState([])
    const [Estado, setEstado] = useState(false)
    const [Mostar, setMostrar] = useState(false)
    const [Perfiles, setPerfiles] = useState([])
    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";

    useEffect(() => {
        const buscarPerfil = JSON.parse(localStorage.getItem("Perfil-Iniciado"));
        setPerfil(buscarPerfil)
        const urlNombre = JSON.parse(localStorage.getItem("nombres"))
        const perfiles = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`))
        const filtrados = perfiles.filter((element) => element?.nombre !== buscarPerfil[0]?.nombre)
        setPerfiles(filtrados)
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

    const CambiarPerfil = (e) => {
        const buscar = Perfiles.filter((element) => element.nombre === e.target.id)
        localStorage.setItem("Perfil-Iniciado", JSON.stringify(buscar))
        setPerfil(buscar)
        if(buscar){
            window.location.reload()
        }
    }

    const traerPeloiculas = async (pelicula) => {
        const url = `${API}/search/movie?api_key=${API_KEY}&query=${pelicula}`;
        const response = await fetch(url);
        const data = await response.json();
        let informacion = []
        for (let i = 0; i < 6; i++) {
            if (data.results[i].original_language === "en" && data.results[i]?.poster_path !== undefined && data.results[i]?.poster_path !== null) {
                const votos = data?.results[i]?.vote_average
                const votoFinal = votos.toFixed(1)
                let info = {
                    name: data?.results[i]?.title,
                    imagen: `https://image.tmdb.org/t/p/w500/${data?.results[i]?.poster_path}`,
                    id: data?.results[i]?.id,
                    tipo: "Pelicula",
                    voto: votoFinal
                }
                informacion.push(info)
            }
        }

        const urlSerie = `${API}/search/tv?api_key=${API_KEY}&query=${pelicula}`;
        const responseSerie = await fetch(urlSerie);
        const dataSerie = await responseSerie.json();
        for (let i = 0; i < 6 ; i++) {
            if (dataSerie?.results[i]?.poster_path !== undefined && dataSerie.results[i].poster_path !== null) {
                const votos = dataSerie?.results[i]?.vote_average
                const votoFinal = votos.toFixed(1)
                let info = {
                    name: dataSerie?.results[i]?.name,
                    imagen: `https://image.tmdb.org/t/p/w500/${dataSerie?.results[i]?.poster_path}`,
                    id: dataSerie?.results[i]?.id,
                    tipo:"Series",
                    voto: votoFinal
                }
                informacion.push(info)            
            }
        }
        setPeliBuscar(informacion)


    }

    const Delete = (e) => {
        const urlNombre = JSON.parse(localStorage.getItem("nombres"));
        const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`));
        const perfiles = []

        for (let i = 0; perfilesCreados?.length > i; i++) {
            if (perfilesCreados[i].nombre !== e.target.id) {
                let info = {
                    nombre: perfilesCreados[i].nombre,
                    imagen: perfilesCreados[i].imagen
                }
                perfiles.push(info)
            }
        }
        setPerfiles(perfiles)
        localStorage.setItem(`Perfiles${urlNombre}`, JSON.stringify(perfiles))
        localStorage.removeItem(`PelisGuardadas-${e.target.id}`)
    };

    const buscar = (e) => {
        e.preventDefault()
        if (e.target.value.length > 2) {
            traerPeloiculas(e.target.value)
            setChange(e.target.value)
        } else {
            setPeliBuscar([])
        }


    }
    return (
        <header className={scrolled ? "navbar scrolled" : "navbar"}>
            <nav>
                <h2>Pelis</h2>
                <ul>
                    <li><NavLink className='links' to="/inicio">Inicio</NavLink></li>
                    <li><a className='links' href="#">Acerca</a></li>
                    <li><NavLink className='links' to="/Filtros">Filtros</NavLink></li>
                </ul>

                <div className='divRight'>
                    {
                        Estado === false

                            ?
                            <FontAwesomeIcon onClick={() => setEstado(true)} icon={faMagnifyingGlass} className='iconoSearch'></FontAwesomeIcon>
                            :
                            <input onBlur={() => setEstado(false)}  onChange={buscar} type="search" className='input' placeholder={"Titulo" || change} />

                    }
                    <img className='imagenPerfil' src={Perfil[0]?.imagen}  onMouseEnter={() => setMostrar(true)} alt="" />
                    {
                        Mostar === true

                        ?
                        <div className='perfilesMain' onMouseLeave={() => setMostrar(false)}>
                            {Perfiles.map((perfil)=>{
                                return(
                                    <div className='dentroPerfiles'>
                                        <img src={perfil?.imagen}></img> <span>{perfil?.nombre}</span><button onClick={Delete} id={perfil?.nombre}><FontAwesomeIcon onClick={Delete} id={perfil?.nombre} className='iconoTrash' icon={faTrash}/></button><button className='buttonFlecha' onClick={CambiarPerfil} id={perfil?.nombre}><FontAwesomeIcon id={perfil?.nombre} onClick={CambiarPerfil} className='iconoArrow' icon={faArrowAltCircleRight}/></button>
                                    </div>
                                )
                            })}
                            <div className='CerrarSesion'>
                                <NavLink className="LinkCerrar" to="/">Cerrar Sesion</NavLink>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </nav>
        </header>
    )
}

export default NavBar