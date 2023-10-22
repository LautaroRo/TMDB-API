import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../NavBar'
import pop from "./../../Assets/pop.png"
import "./estilos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faX, faPlay } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { Use } from '../../Context/Perfil'

const Filtos = () => {

    const { PeliBuscar, change } = useContext(Use)
    const [Todo, setTodo] = useState([])
    const [Estado, setEstado] = useState(false)
    const [Estado2, setEstado2] = useState()
    const [Estilo, setEstilo] = useState(false)
    const [Seleccion, setSeleccion] = useState([])
    const [Generos, setGeneros] = useState([])
    const [Filtrados, setFiltrados] = useState([])
    const [Contador, setContador] = useState(4)
    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";


    const traerTodasPeliculas = async () => {
        try {
            let Peliculas = []


            for (let i = 5; i < 8; i++) {
                const traerlasPeliculas = `${API}/movie/top_rated?api_key=${API_KEY}&page=${i}`
                const traerLasPelisFetch = await fetch(traerlasPeliculas)
                const pelisUrl = await traerLasPelisFetch.json()

                for (let j = 0; j < pelisUrl?.results?.length; j++) {
                    let info = {
                        imagen: `https://image.tmdb.org/t/p/original${pelisUrl.results[j].poster_path}`,
                        name: pelisUrl.results[j].title,
                        id: pelisUrl.results[j].id,
                        tipo: "Pelicula",
                        voto: pelisUrl.results[j].vote_average
                    }
                    Peliculas.push(info)
                }
            }


            for (let j = 5; j < 8; j++) {
                let url = `${API}/tv/top_rated?api_key=${API_KEY}&page=${j}`
                const urlFetch = await fetch(url)
                const urlJson = await urlFetch.json()

                for (let i = 0; i < urlJson?.results?.length; i++) {
                    let img = urlJson?.results[i].poster_path
                    const Imagenes = `https://image.tmdb.org/t/p/original${img}`;
                    let infoGuardad = {
                        name: urlJson?.results[i].name,
                        imagen: Imagenes,
                        tipo: "Series",
                        id: urlJson?.results[i].id,
                        voto: urlJson?.results[i].vote_average
                    }
                    Peliculas.push(infoGuardad)
                }
            }
            setTodo(Peliculas)
        } catch {
            console.log("error")
        }
    }

    useEffect(() => {
        traerTodasPeliculas()
    }, [])








    useEffect(() => {
        const buscar = async () => {

            try {
                if (Seleccion === "Peliculas" || Seleccion === null) {
                    let Peliculas = []
                    setFiltrados([])
                    for (let i = 0; Contador > i; i++) {
                        const traerlasPeliculas = `${API}/movie/top_rated?api_key=${API_KEY}&page=${i}`
                        const traerLasPelisFetch = await fetch(traerlasPeliculas)
                        const pelisUrl = await traerLasPelisFetch.json()
                        for (let j = 0; pelisUrl?.results?.length > j; j++) {
                            const incluidos = pelisUrl?.results[j]?.genre_ids;
                            const filtrar = Generos.some((element) => incluidos.includes(element))
                            if (Generos.length < 1) {
                                let info = {
                                    name: pelisUrl?.results[j]?.title,
                                    imagen: `https://image.tmdb.org/t/p/w500/${pelisUrl?.results[j].poster_path}`,
                                    id: pelisUrl?.results[j]?.id,
                                    voto: pelisUrl?.results[j]?.vote_average,
                                    tipo: "Peliculas"
                                }
                                if (info?.imagen !== null && info?.imagen !== undefined && info?.imagen) {
                                    Peliculas.push(info)
                                }
                            } else if (filtrar) {
                                let info = {
                                    name: pelisUrl?.results[j]?.title,
                                    imagen: `https://image.tmdb.org/t/p/w500/${pelisUrl?.results[j].poster_path}`,
                                    id: pelisUrl?.results[j]?.id,
                                    voto: pelisUrl?.results[j]?.vote_average,
                                    tipo: "Pelicula",
                                    generos: pelisUrl?.results[j]?.genre_ids
                                }
                                if (info?.imagen !== null && info?.imagen !== undefined && info?.imagen) {
                                    Peliculas.push(info)
                                }
                            }
                        }

                    }
                    setFiltrados(Peliculas)

                } else if (Seleccion === "Series" || Seleccion === null) {
                    let Peliculas = []
                    setFiltrados([])
                    for (let i = 0; Contador > i; i++) {
                        const traerlasPeliculas = `${API}/tv/top_rated?api_key=${API_KEY}&page=${i}`
                        const traerLasPelisFetch = await fetch(traerlasPeliculas)
                        const pelisUrl = await traerLasPelisFetch.json()
                        for (let j = 0; pelisUrl?.results?.length > j; j++) {
                            const incluidos = pelisUrl?.results[j]?.genre_ids;
                            const filtrar = Generos.some((element) => incluidos.includes(element))
                            if (Generos.length < 1) {
                                let info = {
                                    name: pelisUrl?.results[j]?.name,
                                    imagen: `https://image.tmdb.org/t/p/w500/${pelisUrl?.results[j].poster_path}`,
                                    id: pelisUrl?.results[j]?.id,
                                    voto: pelisUrl?.results[j]?.vote_average,
                                    tipo: "Series"
                                }
                                if (info?.imagen !== null && info?.imagen !== undefined && info?.imagen) {
                                    Peliculas.push(info)
                                }
                            } else if (filtrar) {
                                let info = {
                                    name: pelisUrl?.results[j]?.name,
                                    imagen: `https://image.tmdb.org/t/p/w500/${pelisUrl?.results[j].poster_path}`,
                                    id: pelisUrl?.results[j]?.id,
                                    voto: pelisUrl?.results[j]?.vote_average,
                                    tipo: "Series",
                                    generos: pelisUrl?.results[j]?.genre_ids
                                }
                                if (info?.imagen !== null && info?.imagen !== undefined && info?.imagen) {
                                    Peliculas.push(info)
                                }
                            }
                        }
                    }
                    setFiltrados(Peliculas)
                } else if (Seleccion.length < 1 && Generos.length > 0) {
                    let Peliculas = []
                    for (let i = 0; Contador > i; i++) {
                        const traerlasPeliculas = `${API}/movie/top_rated?api_key=${API_KEY}&page=${i}`
                        const traerLasPelisFetch = await fetch(traerlasPeliculas)
                        const pelisUrl = await traerLasPelisFetch.json()

                        const traerlasSeries = `${API}/tv/top_rated?api_key=${API_KEY}&page=${i}`
                        const traerLasSeriesFetch = await fetch(traerlasSeries)
                        const seriesUrl = await traerLasSeriesFetch.json()

                        for (let j = 0; pelisUrl?.results?.length > j; j++) {
                            const incluidosPelis = pelisUrl?.results[j]?.genre_ids;
                            const incluidosSeries = seriesUrl?.results[j]?.genre_ids;

                            const filtrarPelis = Generos.some((element) => incluidosPelis.includes(element))
                            const filtrarSeries = Generos.some((element) => incluidosSeries.includes(element))
                            if (seriesUrl && filtrarSeries) {
                                let info = {
                                    name: seriesUrl?.results[j]?.name,
                                    imagen: `https://image.tmdb.org/t/p/w500/${seriesUrl?.results[j].poster_path}`,
                                    id: seriesUrl?.results[j]?.id,
                                    voto: seriesUrl?.results[j]?.vote_average,
                                    tipo: "Series",
                                    generos: seriesUrl?.results[j]?.genre_ids
                                }
                                if (info?.imagen !== null && info?.imagen !== undefined && info?.imagen) {
                                    Peliculas.push(info)
                                }
                            } else if (pelisUrl && filtrarPelis) {
                                let info = {
                                    name: pelisUrl?.results[j]?.title,
                                    imagen: `https://image.tmdb.org/t/p/w500/${pelisUrl?.results[j].poster_path}`,
                                    id: pelisUrl?.results[j]?.id,
                                    voto: pelisUrl?.results[j]?.vote_average,
                                    tipo: "Pelicula",
                                    generos: pelisUrl?.results[j]?.genre_ids
                                }
                                if (info?.imagen !== null && info?.imagen !== undefined && info?.imagen) {
                                    Peliculas.push(info)
                                }
                            }
                        }
                    }
                    setTodo(Peliculas)
                }

            } catch {
                console.log("error")
            }
        }

        buscar()
    }, [Seleccion, Generos, Contador])


    const handleClick = (e) => {
        e.preventDefault()
        setEstilo(true)
        setTimeout(() => {
            setEstado(false)
            setEstilo(false)
        }, 500)
    }

    const seleccion = (e) => {
        e.preventDefault()

        const activado = document.querySelector(".activoBttons")

        if (activado) {

            if (activado === e.target) {
                activado.classList.remove("activoBttons")
                setSeleccion(null)
            } else {
                activado.classList.remove("activoBttons")
                e.target.classList.add("activoBttons")

                setSeleccion(e.target.id)
            }
        } else {
            e.target.classList.add("activoBttons")
            setSeleccion(e.target.id)
        }
    }
    const generos = (e) => {
        e.preventDefault()
        const numero = parseInt(e.target.id)
        const igual = Generos.includes(numero)
        if (igual) {
            const repetidos = Generos.filter(element => element !== numero)
            e.target.classList.remove("activoGeneros")
            setGeneros(repetidos)
        } else {
            e.target.classList.add("activoGeneros")
            setGeneros([...Generos, numero])
        }
    }

    const Sumar = (e) => {
        e.preventDefault()
        setContador(Contador + 10)
    }

    const guardarInfo = (e) => {

        const nombre = e.target.id
        if (nombre?.length < 1) {
            console.log("error")
            e.preventDefault()
        } else {
            localStorage.setItem("Pelicula-Seleccionada", JSON.stringify(nombre))
        }
    }

    return (
        <>

            <NavBar />
            {
                PeliBuscar.length < 1

                    ?
                    <div className='Container-Filtros'>

                        {
                            Estado === false

                                ?
                                <div className="PosicionButton">
                                    <FontAwesomeIcon className='buttonFiltros' onClick={() => setEstado(true)} icon={faAnglesRight} />
                                </div>
                                :

                                <div className={Estilo === false ? 'FiltroBuscar' : "FiltroBuscarOut"}>
                                    <div className="posicionButtonOut">
                                        <FontAwesomeIcon className='buttonFiltrosOut' onClick={handleClick} icon={faX} />
                                    </div>

                                    <div className="containerints">
                                        <div>
                                            <h4 className='h4'>Seleccione el tipo de filmografia</h4>
                                        </div>
                                        <div className='posicionSeleccion'>
                                            <button id='Peliculas' onClick={seleccion} className='buttonsFiltros'>Peliculas</button><button className='buttonsFiltros' id='Series' onClick={seleccion}>Series</button>
                                        </div>
                                        <div>
                                            <h4>Seleccione los generos</h4>
                                        </div>
                                        <div className='PosicionFiltrosDeGenero'>
                                            <button className='buttonGeneros' onClick={generos} id="27">Terror</button>
                                            <button className='buttonGeneros' onClick={generos} id="12">Aventura</button>
                                            <button className='buttonGeneros' onClick={generos} id="18">Drama</button>
                                            <button className='buttonGeneros' onClick={generos} id="35">Comedia</button>
                                            <button className='buttonGeneros' onClick={generos} id="878">Ciencia Ficcion</button>
                                            <button className='buttonGeneros' onClick={generos} id="53">Thriller</button>
                                            <button className='buttonGeneros' onClick={generos} id="10751">Familia</button>
                                            <button className='buttonGeneros' onClick={generos} id="14">Fantasia</button>
                                            <button className='buttonGeneros' onClick={generos} id="10749">Romance</button>
                                            <button className='buttonGeneros' onClick={generos} id="28">Accion</button>
                                            <button className='buttonGeneros' onClick={generos} id="16">Animacion</button>
                                        </div>
                                    </div>
                                </div>
                        }
                        {
                            Filtrados.length < 1

                                ?
                                <div className='Muestra'>
                                    {Todo.map((pelis) => {
                                        return (
                                            <div onMouseEnter={() => setEstado2(pelis.id)} className='pelisFiltrar' style={{
                                                background: `url(${pelis?.imagen}) center / cover no-repeat`,
                                                margin: "10px",
                                                position: "relative",
                                            }}>
                                                {Estado2 === pelis.id

                                                    ?
                                                    <div onMouseLeave={() => setEstado2(null)} className='pelisBuscadasEnter' style={{ background: `linear-gradient(rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.80) 100%),url(${pelis?.imagen}) center / cover no-repeat` }}>
                                                        <h3 className='nombre'>{pelis.name}</h3>
                                                        <span><img className='pop' src={pop}></img>{pelis.voto}</span>
                                                        <NavLink className="navlink123" id={pelis?.id} onClick={guardarInfo} to={`/${pelis.tipo}/${pelis.name}`}>
                                                            <FontAwesomeIcon id={pelis.id} onClick={guardarInfo} className='icono' icon={faPlay} />
                                                        </NavLink>

                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                        )
                                    })}
                                </div>

                                :
                                <div className='MainFiltrados'>
                                    <div className="containerPeliFiltradas">
                                        {Filtrados.map((fil) => {
                                            return (
                                                <div onMouseEnter={() => setEstado2(fil.id)} className='pelisFiltrar' style={{
                                                    background: `url(${fil?.imagen}) center / cover no-repeat`,
                                                    margin: "10px",
                                                    position: "relative",
                                                }}>
                                                    {Estado2 === fil.id

                                                        ?
                                                        <div onMouseLeave={() => setEstado2(null)} className='pelisBuscadasEnter' style={{ background: `linear-gradient(rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.80) 100%),url(${fil?.imagen}) center / cover no-repeat` }}>
                                                            <h3 className='nombre'>{fil.name}</h3>
                                                            <span><img className='pop' src={pop}></img>{fil.voto}</span>
                                                            <NavLink className="navlink123" id={fil?.id} onClick={guardarInfo} to={`/${fil.tipo}/${fil.name}`}>
                                                                <FontAwesomeIcon id={fil.id} onClick={guardarInfo} className='icono' icon={faPlay} />
                                                            </NavLink>
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {
                                        Contador < 100

                                            ?

                                            <div>
                                                <button className='MostrarMas' onClick={Sumar}>Mostrar mas</button>
                                            </div>

                                            :

                                            null
                                    }
                                </div>


                        }


                    </div>

                    :
                    <div className='container_Buscador'>
                        <h1>{change}</h1>
                        <div className='container_pelisBuscadas'>
                            {PeliBuscar.map((pelis) => {
                                return (
                                    <>
                                        <div onMouseEnter={() => setEstado(pelis.id)} className='pelisBuscadas' style={{
                                            background: `url(${pelis?.imagen}) center / cover no-repeat`,
                                            margin: "10px",
                                            position: "relative",
                                            zIndex: "1"
                                        }}>

                                            {Estado !== pelis.id

                                                ?
                                                null
                                                :
                                                <div onMouseLeave={() => setEstado(null)} className='pelisBuscadasEnter' style={{ background: `linear-gradient(rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.80) 100%),url(${pelis?.imagen}) center / cover no-repeat` }}>
                                                    <h3 className='nombre'>{pelis.name}</h3>
                                                    <span><img className='pop' src={pop}></img>{pelis.voto}</span>
                                                    <NavLink className="navlink123" id={pelis?.id} onClick={guardarInfo} to={`/${pelis.tipo}/${pelis.name}`}>
                                                        <FontAwesomeIcon id={pelis.id} onClick={guardarInfo} className='icono' icon={faPlay} />
                                                    </NavLink>

                                                </div>
                                            }

                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
            }
        </>
    )
}

export default Filtos