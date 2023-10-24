import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons'
import "./estilos.css"
import { Use } from '../../Context/Perfil'
import { NavLink } from 'react-router-dom'
import netflix from "./../../Assets/netflix.png"
const NavBar = () => {

    const { setPeliBuscar, setChange, change } = useContext(Use)
    const [scrolled, setScrolled] = useState(false);
    const [Perfil, setPerfil] = useState([])
    const [Estado, setEstado] = useState(false)
    const [Mostar, setMostrar] = useState(false)
    const [Perfiles, setPerfiles] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";

    const name = JSON.parse(localStorage.getItem("nombres"))

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
        if (buscar) {
            window.location.reload()
        }
    }

    const traerPeloiculas = async (pelicula) => {
        const url = `${API}/search/movie?api_key=${API_KEY}&query=${pelicula}`;
        const response = await fetch(url);
        const data = await response.json();
        let informacion = []
        if (data?.results) {
            for (let i = 0; i < 6; i++) {
                if (data?.results[i] && data.results[i].original_language === "en" && data.results[i]?.poster_path !== undefined && data.results[i]?.poster_path !== null) {
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
        }

        const urlSerie = `${API}/search/tv?api_key=${API_KEY}&query=${pelicula}`;
        const responseSerie = await fetch(urlSerie);
        const dataSerie = await responseSerie.json();
        if (dataSerie?.results) {


            for (let i = 0; i < 6; i++) {
                if (data.results[i] && data.results[i].original_language === "en" && data.results[i]?.poster_path !== undefined && data.results[i]?.poster_path !== null && data.results[i].original_language) {
                    const votos = dataSerie?.results[i]?.vote_average
                    const votoFinal = votos.toFixed(1)
                    let info = {
                        name: dataSerie?.results[i]?.name,
                        imagen: `https://image.tmdb.org/t/p/w500/${dataSerie?.results[i]?.poster_path}`,
                        id: dataSerie?.results[i]?.id,
                        tipo: "Series",
                        voto: votoFinal
                    }
                    informacion.push(info)
                }
            }
        }
        setPeliBuscar(informacion)

    }


    const buscar = (e) => {
        e.preventDefault()
        if (e.target.value.length > 2) {
            traerPeloiculas(e.target.value)
            setChange(e.target.value)
        } else {
            setPeliBuscar([])
        }


    }
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    }
    const nameInicio = localStorage.getItem("nombres")
    return (
        <header className={scrolled ? "navbar scrolled" : "navbar"}>
            <nav>
                <input type="checkbox" id="check" checked={isChecked} onChange={handleCheckboxClick} />
                <NavLink to="/"><img className='imgLogo' src={netflix} /></NavLink>
                <ul className='activoul'>
                    <li><NavLink className='links' to="/inicio">Inicio</NavLink></li>
                    <li><NavLink className='links' to="/Filtros">Filtros</NavLink></li>
                </ul>
                <div className='divRight'>
                    <label htmlFor="check" className='checkbtn'>
                        <FontAwesomeIcon className='bar' icon={faBars}></FontAwesomeIcon>
                    </label>
                    {
                        Estado === false

                            ?
                            <FontAwesomeIcon onClick={() => setEstado(true)} icon={faMagnifyingGlass} className='iconoSearch'></FontAwesomeIcon>
                            :
                            <input onBlur={() => setEstado(false)} onChange={buscar} type="search" className='input' placeholder={"Titulo" || change} />

                    }
                    <img className='imagenPerfil' src={Perfil[0]?.imagen} onMouseEnter={() => setMostrar(true)} alt="" />
                    {
                        Mostar === true

                            ?
                            <>
                                <div className='perfilesMain' onMouseLeave={() => setMostrar(false)}>
                                    {
                                        Perfiles.length < 1

                                            ?
                                            <div className='dentroPerfilesVTwo'>
                                                <NavLink className="volverPerfiles" to={`/ruta/${name}`}>Crear Perfiles</NavLink>
                                            </div>
                                            :
                                            <>
                                                {Perfiles.map((perfil) => {
                                                    return (
                                                        <div  className='dentroPerfiles'>
                                                            <img src={perfil?.imagen}></img>
                                                            <div onClick={CambiarPerfil} id={perfil?.nombre} className='adentroNombres' style={{
                                                                background: `linear-gradient(rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.90) 100%),url(${perfil?.imagen})center / cover no-repeat`
                                                            }}>
                                                                <h2>{perfil?.nombre}</h2>
                                                            </div>
                                                        </div>

                                                    )
                                                })}
                                            </>
                                    }

                                    <div className='CerrarSesion'>
                                        <NavLink className="LinkCerrar" to="/">Cerrar Sesion</NavLink>
                                        <NavLink className="LinkCerrar" to={`/ruta/${nameInicio}`}>Volver</NavLink>
                                    </div>
                                </div>
                                <div className='perfilesMainMedia' >
                                    <h1 className='x' onClick={() => setMostrar(false)}>X</h1>
                                    <div className="organizarPerfiles">

                                        {
                                            Perfiles.length < 2

                                                ?
                                                <div className='dentroPerfiles'>
                                                    <NavLink className="volverPerfiles" to={`/ruta/${name}`}>Crear Perfiles</NavLink>
                                                </div>
                                                :
                                                <>
                                                    {Perfiles.map((perfil) => {
                                                        return (
                                                            <div className='dentroPerfiles'>
                                                                <img className='imagen' onClick={CambiarPerfil} id={perfil?.nombre} src={perfil?.imagen}></img>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                        }

                                    </div>

                                    <div className='CerrarSesionMedia'>
                                        <NavLink className="LinkCerrar" to="/">Cerrar Sesion</NavLink>
                                        <NavLink className="LinkCerrar" to={`/ruta/${nameInicio}`}>Volver</NavLink>
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }
                </div>
            </nav>
        </header>
    )
}

export default NavBar