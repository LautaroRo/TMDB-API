import React, { useState, useEffect, useContext } from 'react'
import { NavLink, json, useParams } from 'react-router-dom'
import pop from "./../../Assets/pop.png"
import "./estilos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import NavBar from '../NavBar'
import { Use } from '../../Context/Perfil'
const Main = () => {
    const { PeliBuscar, change, vaciar } = useContext(Use)
    const [Movies, setMovies] = useState([])
    const [Movies2, setMovies2] = useState([])
    const [Series, setSeries] = useState([])
    const [Series2, setSeries2] = useState([])
    const [show, setShow] = useState(null)
    const [Estado, setEstado] = useState(null)
    const [PelisGuardadas, setPelisGuardadas] = useState([])
    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";


    const { name } = useParams()
    const traerTodasPeliculas = async () => {
        try {

            let peliculas = []
            let MejoresPeliculas = []
            for (let j = 0; 5 > j; j++) {

                let urlUltimasPelis = `${API}/movie/popular?api_key=${API_KEY}&page=${j}`;
                const responseUltimasPelis = await fetch(urlUltimasPelis)
                const dataUltimasPelis = await responseUltimasPelis.json()

                for (let j = 0; dataUltimasPelis?.results?.length > j; j++) {
                    let img = dataUltimasPelis.results[j].poster_path
                    let img2 = dataUltimasPelis.results[j].backdrop_path

                    const Imagenes = `https://image.tmdb.org/t/p/original${img}`;
                    const Imagenes2 = `https://image.tmdb.org/t/p/original${img2}`;

                    if (img) {
                        let name = dataUltimasPelis.results[j].title
                        let id = dataUltimasPelis.results[j].id;
                        const critic = dataUltimasPelis.results[j].vote_average;
                        let info = {
                            name: name,
                            id: id,
                            img: Imagenes,
                            img2: Imagenes2,
                            critic: critic,
                        }
                        peliculas.push(info)

                    }

                }
            }




            for (let i = 0; 5 > i; i++) {
                let urlMejoresPeliculas = `${API}/movie/top_rated?api_key=${API_KEY}&page=${i}`;
                const responseMejoresPeliculas = await fetch(urlMejoresPeliculas)
                const dataMejoresPeliculas = await responseMejoresPeliculas.json()

                for (let j = 0; dataMejoresPeliculas?.results?.length > j; j++) {
                    let img = dataMejoresPeliculas.results[j].poster_path
                    let img2 = dataMejoresPeliculas.results[j].backdrop_path

                    const Imagenes = `https://image.tmdb.org/t/p/original${img}`;
                    const Imagenes2 = `https://image.tmdb.org/t/p/original${img2}`;
                    const name = dataMejoresPeliculas.results[j].title
                    let id = dataMejoresPeliculas.results[j].id;

                    const critic = dataMejoresPeliculas.results[j].vote_average;
                    let info = {
                        name: name,
                        img: Imagenes,
                        img2: Imagenes2,
                        critic: critic,
                        id: id
                    }

                    MejoresPeliculas.push(info)
                }
            }

            setMovies2([...Movies2, ...MejoresPeliculas])
            setMovies([...Movies, ...peliculas])

        }
        catch {
            console.log("error")
        }
    }


    const traerTodaslasSeries = async () => {
        try {
            let info = []
            let info2 = []
            for (let j = 0; 5 > j; j++) {
                let url = `${API}/tv/popular?api_key=${API_KEY}&page=${j}`
                const urlFetch = await fetch(url)
                const urlJson = await urlFetch.json()


                for (let i = 0; urlJson?.results?.length > i; i++) {
                    let img = urlJson?.results[i].poster_path
                    let img2 = urlJson?.results[i].backdrop_path

                    const Imagenes = `https://image.tmdb.org/t/p/original${img}`;
                    const Imagenes2 = `https://image.tmdb.org/t/p/original${img2}`;
                    const critic = urlJson?.results[i]?.vote_average;
                    let infoGuardad = {
                        name: urlJson?.results[i].name,
                        img: Imagenes,
                        img2: Imagenes2,
                        id: urlJson?.results[i].id,
                        critic: critic
                    }
                    info.push(infoGuardad)
                }
            }

            for (let j = 0; 5 > j; j++) {
                let url = `${API}/tv/top_rated?api_key=${API_KEY}&page=${j}`
                const urlFetch = await fetch(url)
                const urlJson = await urlFetch.json()


                for (let i = 0; urlJson?.results?.length > i; i++) {
                    let img = urlJson?.results[i].poster_path
                    let img2 = urlJson?.results[i].backdrop_path

                    const Imagenes = `https://image.tmdb.org/t/p/original${img}`;
                    const Imagenes2 = `https://image.tmdb.org/t/p/original${img2}`;
                    const critic = urlJson?.results[i]?.vote_average;
                    let infoGuardad = {
                        name: urlJson?.results[i].name,
                        img: Imagenes,
                        img2: Imagenes2,
                        id: urlJson?.results[i].id,
                        critic: critic
                    }
                    info2.push(infoGuardad)
                }
            }

            setSeries([...Series, ...info])
            setSeries2([...Series2, ...info2])
        } catch {
            console.log("error")
        }
    }

    useEffect(() => {
        traerTodasPeliculas()
        traerTodaslasSeries()
        const perfilIniciado = JSON.parse(localStorage.getItem("Perfil-Iniciado"))

        const pelisFav = JSON.parse(localStorage.getItem(`PelisGuardadas-${perfilIniciado[0]?.nombre}`))
        if (pelisFav) {
            setPelisGuardadas(pelisFav)
            console.log(pelisFav)
        }
    }, [])


    const mas = (e) => {
        e.preventDefault()

        if (e?.target?.className === "mas") {
            const divScroll = document.querySelector(".sectiondiv")

            try {
                divScroll.scrollLeft += 300
            }
            catch {
                divScroll.scrollLeft += 300
            }

        } else if (e?.target?.className === "mas2") {
            const divScroll = document.querySelector(".sectiondiv2")

            try {
                divScroll.scrollLeft += 300
            }
            catch {
                divScroll.scrollLeft += 300
            }
        } else if (e?.target?.className === "mas3") {
            const divScroll = document.querySelector(".sectiondiv3")

            try {
                divScroll.scrollLeft += 300
            }
            catch {
                divScroll.scrollLeft += 300
            }
        } else if (e?.target?.className === "mas4") {
            const divScroll = document.querySelector(".sectiondiv4")

            try {
                divScroll.scrollLeft += 300
            }
            catch {
                divScroll.scrollLeft += 300
            }
        }  else if (e?.target?.className === "mas5") {
            const divScroll = document.querySelector(".sectiondiv5")

            try {
                divScroll.scrollLeft += 300
            }
            catch {
                divScroll.scrollLeft += 300
            }
        }
    }

    const menos = (e) => {
        e.preventDefault()
        if (e?.target?.className === "menos") {
            const divScroll = document.querySelector(".sectiondiv")

            try {
                divScroll.scrollLeft -= 300
            }
            catch {
                divScroll.scrollLeft -= 300
            }

        } else if (e?.target?.className === "menos2") {
            const divScroll = document.querySelector(".sectiondiv2")

            try {
                divScroll.scrollLeft -= 300
            }
            catch {
                divScroll.scrollLeft -= 300
            }
        } else if (e?.target?.className === "menos3") {
            const divScroll = document.querySelector(".sectiondiv3")

            try {
                divScroll.scrollLeft -= 300
            }
            catch {
                divScroll.scrollLeft -= 300
            }
        } else if (e?.target?.className === "menos4") {
            const divScroll = document.querySelector(".sectiondiv4")

            try {
                divScroll.scrollLeft -= 300
            }
            catch {
                divScroll.scrollLeft -= 300
            }
        } else if (e?.target?.className === "menos5") {
            const divScroll = document.querySelector(".sectiondiv5")

            try {
                divScroll.scrollLeft -= 300
            }
            catch {
                divScroll.scrollLeft -= 300
            }
        }



    }



    const guardarInfo = (e) => {

        const nombre = e.target.id
        if (nombre.length < 1) {
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
                    <>
                        <Header />
                        <main>
                            <section>
                                <div className='divTitlePeliculas'>
                                    <h2 className='titlePeliculas'>Peliculas mas populares del momento</h2>
                                </div>
                                <button className='menos' onClick={menos}>
                                    -
                                </button>
                                <div className='sectiondiv'>
                                    <div className="containerMoviesTodas">
                                        <div className='MoviesTodas'>

                                            {Movies.map((pelis) => {
                                                return (
                                                    <div
                                                        className={show === null ? "ContainerCards" : "ContainerActive"}
                                                        key={pelis.id}
                                                        onMouseLeave={() => setShow(null)}
                                                        style={{
                                                            background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${pelis?.img2}) center top / cover no-repeat`,
                                                            width: "100%",
                                                            height: "100%"
                                                        }}
                                                    >
                                                        <div className="divInside">
                                                            <img
                                                                className={show === pelis.id ? "imgactive" : "img"}
                                                                src={pelis.img}
                                                                onMouseEnter={() => setShow(pelis.id)}
                                                                alt={pelis.name}
                                                            />
                                                        </div>
                                                        <div className="p">
                                                            {show === pelis.id && (
                                                                <div className="Show" key={pelis}>
                                                                    <h2>{pelis.name}</h2>
                                                                    <div className="showdiv">
                                                                        <span>
                                                                            <img src={pop} alt="Popularity" />
                                                                        </span>
                                                                        <p>{pelis.critic}/10</p>
                                                                    </div>
                                                                    <NavLink id={pelis.id} onClick={guardarInfo} to={`/Pelicula/${pelis.name}`}>
                                                                        <FontAwesomeIcon id={pelis.id} onClick={guardarInfo} className='icono' icon={faPlay} />
                                                                    </NavLink>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <button className='mas' onClick={mas}>
                                    +
                                </button>


                            </section>






                            <section>
                                <div className='divTitlePeliculas'>
                                    <h2 className='titlePeliculas'>Peliculas mas aclamadas por la critica</h2>
                                </div>
                                <button className='menos2' onClick={menos}>
                                    -
                                </button>
                                <div className='sectiondiv2'>
                                    <div className="containerMoviesTodas">
                                        <div className='MoviesTodas'>

                                            {Movies2.map((pelis) => {
                                                return (
                                                    <div
                                                        className={show === null ? "ContainerCards" : "ContainerActive"}
                                                        key={pelis.id}
                                                        onMouseLeave={() => setShow(null)}
                                                        style={{
                                                            background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${pelis?.img2}) center top / cover no-repeat`,
                                                            width: "100%",
                                                            height: "100%"
                                                        }}
                                                    >
                                                        <div className="divInside">
                                                            <img
                                                                className={show === pelis.id ? "imgactive" : "img"}
                                                                src={pelis.img}
                                                                onMouseEnter={() => setShow(pelis.id)}
                                                                alt={pelis.name}
                                                            />
                                                        </div>
                                                        <div className="p">
                                                            {show === pelis.id && (
                                                                <div className="Show">
                                                                    <h2>{pelis.name}</h2>
                                                                    <div className="showdiv">
                                                                        <span>
                                                                            <img src={pop} alt="Popularity" />
                                                                        </span>
                                                                        <p>{pelis.critic}/10</p>
                                                                    </div>
                                                                    <NavLink id={pelis.id} onClick={guardarInfo} to={`/Pelicula/${pelis.name}`}>
                                                                        <FontAwesomeIcon id={pelis.id} onClick={guardarInfo} className='icono' icon={faPlay} />
                                                                    </NavLink>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <button className='mas2' onClick={mas}>
                                    +
                                </button>
                            </section>


                            <section>
                                <div className='divTitlePeliculas'>
                                    <h2 className='titlePeliculas'>Peliculas mas aclamadas por la critica</h2>
                                </div>
                                <button className='menos3' onClick={menos}>
                                    -
                                </button>
                                <div className='sectiondiv3'>
                                    <div className="containerMoviesTodas">
                                        <div className='MoviesTodas'>

                                            {Series.map((serie) => {
                                                return (
                                                    <div
                                                        className={show === null ? "ContainerCards" : "ContainerActive"}
                                                        key={serie.id}
                                                        onMouseLeave={() => setShow(null)}
                                                        style={{
                                                            background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${serie?.img2}) center top / cover no-repeat`,
                                                            width: "100%",
                                                            height: "100%"
                                                        }}
                                                    >
                                                        <div className="divInside">
                                                            <img
                                                                className={show === serie.id ? "imgactive" : "img"}
                                                                src={serie.img}
                                                                onMouseEnter={() => setShow(serie.id)}
                                                                alt={serie.name}
                                                            />
                                                        </div>
                                                        <div className="p">
                                                            {show === serie.id && (
                                                                <div className="Show">
                                                                    <h2>{serie.name}</h2>
                                                                    <div className="showdiv">
                                                                        <span>
                                                                            <img src={pop} alt="Popularity" />
                                                                        </span>
                                                                        <p>{serie.critic}/10</p>
                                                                    </div>
                                                                    <NavLink id={serie.id} onClick={guardarInfo} to={`/Series/${serie.name}`}>
                                                                        <FontAwesomeIcon id={serie.id} onClick={guardarInfo} className='icono' icon={faPlay} />
                                                                    </NavLink>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <button className='mas3' onClick={mas}>
                                    +
                                </button>
                            </section>


                            <section>
                                <div className='divTitlePeliculas'>
                                    <h2 className='titlePeliculas'>Peliculas mas aclamadas por la critica</h2>
                                </div>
                                <button className='menos4' onClick={menos}>
                                    -
                                </button>
                                <div className='sectiondiv4'>
                                    <div className="containerMoviesTodas">
                                        <div className='MoviesTodas'>

                                            {Series2.map((serie) => {
                                                return (
                                                    <div
                                                        className={show === null ? "ContainerCards" : "ContainerActive"}
                                                        key={serie.id}
                                                        onMouseLeave={() => setShow(null)}
                                                        style={{
                                                            background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${serie?.img2}) center top / cover no-repeat`,
                                                            width: "100%",
                                                            height: "100%"
                                                        }}
                                                    >
                                                        <div className="divInside">
                                                            <img
                                                                className={show === serie.id ? "imgactive" : "img"}
                                                                src={serie.img}
                                                                onMouseEnter={() => setShow(serie.id)}
                                                                alt={serie.name}
                                                            />
                                                        </div>
                                                        <div className="p">
                                                            {show === serie.id && (
                                                                <div className="Show">
                                                                    <h2>{serie.name}</h2>
                                                                    <div className="showdiv">
                                                                        <span>
                                                                            <img src={pop} alt="Popularity" />
                                                                        </span>
                                                                        <p>{serie.critic}/10</p>
                                                                    </div>
                                                                    <NavLink id={serie.id} onClick={guardarInfo} to={`/Series/${serie.name}`}>
                                                                        <FontAwesomeIcon id={serie.id} onClick={guardarInfo} className='icono' icon={faPlay} />
                                                                    </NavLink>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <button className='mas4' onClick={mas}>
                                    +
                                </button>
                            </section>
                            {
                                PelisGuardadas.length > 0

                                    ?
                                    <section>
                                        <div className='divTitlePeliculas'>
                                            <h2 className='titlePeliculas'>Peliculas mas aclamadas por la critica</h2>
                                        </div>
                                        <button className='menos5' onClick={menos}>
                                            -
                                        </button>
                                        <div className='sectiondiv5'>
                                            <div className="containerMoviesTodas">
                                                <div className='MoviesTodas'>

                                                    {PelisGuardadas.map((peli) => {
                                                        return (
                                                            <div

                                                                className={show === null ? "ContainerCards" : "ContainerActive"}
                                                                key={peli.id}
                                                                onMouseLeave={() => setShow(null)}
                                                                style={{
                                                                    background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${peli?.img2}) center top / cover no-repeat`,
                                                                    width: "100%",
                                                                    height: "100%"
                                                                }}
                                                            >
                                                                <div className="divInside">
                                                                    <img
                                                                        className={show === peli.id ? "imgactive" : "img"}
                                                                        src={peli.img1}
                                                                        onMouseEnter={() => setShow(peli.id)}
                                                                        alt={peli.name}
                                                                    />
                                                                </div>
                                                                <div className="p">
                                                                    {show === peli.id && (
                                                                        <div className="Show">
                                                                            <h2>{peli.name}</h2>
                                                                            <div className="showdiv">
                                                                                <span>
                                                                                    <img src={pop} alt="Popularity" />
                                                                                </span>
                                                                                <p>{peli.critic}/10</p>
                                                                            </div>
                                                                            <NavLink id={peli.id} onClick={guardarInfo} to={`/Series/${peli.name}`}>
                                                                                <FontAwesomeIcon id={peli.id} onClick={guardarInfo} className='icono' icon={faPlay} />
                                                                            </NavLink>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        )
                                                    })}

                                                </div>
                                            </div>
                                        </div>
                                        <button className='mas5' onClick={mas}>
                                            +
                                        </button>
                                    </section>
                                    :
                                    
                                    null
                            }
                        </main>
                    </>
                    :
                    <div className='container_Buscador'>
                        <div className='h1AndDelete'>
                            <h1>{change}</h1><button className='deleteBuscador' onClick={vaciar}>Delete</button>
                        </div>

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

export default Main
