import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import pop from "./../../Assets/pop.png"
import "./estilos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import NavBar from '../NavBar'
import { Use } from '../../Context/Perfil'
const Main = () => {
    const { PeliBuscar, change, vaciar, Movies, Movies2, traerTodasPeliculas,traerTodaslasSeries, Series, Series2} = useContext(Use)

    const [show, setShow] = useState(null)
    const [Estado, setEstado] = useState(null)
    const [PelisGuardadas, setPelisGuardadas] = useState([])
    const [SeriesGuardadas, setSeriesGuardadas] = useState([])



    const { name } = useParams()


    useEffect(() => {
        traerTodasPeliculas()
        traerTodaslasSeries()
        const perfilIniciado = JSON.parse(localStorage.getItem("Perfil-Iniciado"))
        const nombre = JSON.parse(localStorage.getItem("nombres"))
        const pelisFav = JSON.parse(localStorage.getItem(`PelisGuardadas${nombre}+${perfilIniciado[0]?.nombre}`))
        if (pelisFav) {
            setPelisGuardadas(pelisFav)

        }
    }, [])

    useEffect(() => {
        const perfilIniciado = JSON.parse(localStorage.getItem("Perfil-Iniciado"))
        const nombre = JSON.parse(localStorage.getItem("nombres"))
        const seriesFav = JSON.parse(localStorage.getItem(`SeriesGuardadas${nombre}+${perfilIniciado[0]?.nombre}`))
        if (seriesFav) {
            setSeriesGuardadas(seriesFav)
        }
    }, [])
    const mas = (e) => {
        e.preventDefault()

        if (e?.target?.className === "mas") {
            const divScroll = document.querySelector(".sectiondiv")

            try {
                divScroll.scrollLeft += 200
            }
            catch {
                divScroll.scrollLeft += 200
            }

        } else if (e?.target?.className === "mas2") {
            const divScroll = document.querySelector(".sectiondiv2")

            try {
                divScroll.scrollLeft += 150
            }
            catch {
                divScroll.scrollLeft += 150
            }
        } else if (e?.target?.className === "mas3") {
            const divScroll = document.querySelector(".sectiondiv3")

            try {
                divScroll.scrollLeft += 150
            }
            catch {
                divScroll.scrollLeft += 150
            }
        } else if (e?.target?.className === "mas4") {
            const divScroll = document.querySelector(".sectiondiv4")

            try {
                divScroll.scrollLeft += 150
            }
            catch {
                divScroll.scrollLeft += 150
            }
        } else if (e?.target?.className === "mas5") {
            const divScroll = document.querySelector(".sectiondiv5")

            try {
                divScroll.scrollLeft += 150
            }
            catch {
                divScroll.scrollLeft += 150
            }
        } else if (e?.target?.className === "mas6") {
            const divScroll = document.querySelector(".sectiondiv6")

            try {
                divScroll.scrollLeft += 150
            }
            catch {
                divScroll.scrollLeft += 150
            }
        }
    }

    const menos = (e) => {
        e.preventDefault()
        if (e?.target?.className === "menos") {
            const divScroll = document.querySelector(".sectiondiv")

            try {
                divScroll.scrollLeft -= 150
            }
            catch {
                divScroll.scrollLeft -= 150
            }

        } else if (e?.target?.className === "menos2") {
            const divScroll = document.querySelector(".sectiondiv2")

            try {
                divScroll.scrollLeft -= 150
            }
            catch {
                divScroll.scrollLeft -= 150
            }
        } else if (e?.target?.className === "menos3") {
            const divScroll = document.querySelector(".sectiondiv3")

            try {
                divScroll.scrollLeft -= 150
            }
            catch {
                divScroll.scrollLeft -= 150
            }
        } else if (e?.target?.className === "menos4") {
            const divScroll = document.querySelector(".sectiondiv4")

            try {
                divScroll.scrollLeft -= 150
            }
            catch {
                divScroll.scrollLeft -= 150
            }
        } else if (e?.target?.className === "menos5") {
            const divScroll = document.querySelector(".sectiondiv5")

            try {
                divScroll.scrollLeft -= 150
            }
            catch {
                divScroll.scrollLeft -= 150
            }
        } else if (e?.target?.className === "menos6") {
            const divScroll = document.querySelector(".sectiondiv6")

            try {
                divScroll.scrollLeft -= 150
            }
            catch {
                divScroll.scrollLeft -= 150
            }
        }



    }



    const guardarInfo = (e) => {

        const nombre = e.target.id
        if (nombre.length < 1) {
            e.preventDefault()
        } else {
            localStorage.removeItem("Pelicula-Seleccionada")
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
                                    <span><FontAwesomeIcon icon={faCircle} /></span><h2 className='titlePeliculas'>Peliculas mas populares del momento</h2>
                                </div>
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
                                <div className="divisionesbotones">
                                    <button className='menos'>-</button>
                                    <button className='mas' onClick={mas}>+</button>
                                </div>
                            </section>






                            <section>
                                <div className='divTitlePeliculas'>
                                    <span><FontAwesomeIcon icon={faCircle} /></span><h2 className='titlePeliculas'>Peliculas mas aclamadas por la critica</h2>
                                </div>
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
                                <div className="divisionesbotones">
                                    <button className='menos2' onClick={menos}>-</button>
                                    <button className='mas2' onClick={mas}>+</button>
                                </div>
                            </section>


                            <section>
                                <div className='divTitlePeliculas'>
                                    <span><FontAwesomeIcon icon={faCircle} /></span><h2 className='titlePeliculas'>Series mas populares del momento</h2>
                                </div>
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
                                <div className="divisionesbotones">
                                    <button className='menos3' onClick={menos}>-</button>
                                    <button className='mas3' onClick={mas}>+</button>
                                </div>
                            </section>


                            <section>
                                <div className='divTitlePeliculas'>
                                    <span><FontAwesomeIcon icon={faCircle} /></span><h2 className='titlePeliculas'>Series mas aclamadas por la critica</h2>
                                </div>

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
                                <div className="divisionesbotones">
                                    <button className='menos4' onClick={menos}>-</button>
                                    <button className='mas4' onClick={mas}>+</button>
                                </div>
                            </section>
                            {
                                PelisGuardadas.length > 0

                                    ?
                                    <section>
                                        <div className='divTitlePeliculas'>
                                            <span><FontAwesomeIcon icon={faStar} /></span><h2 className='titlePeliculas'>Tus Peliculas favoritas</h2>
                                        </div>
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
                                                                            <NavLink id={peli.id} onClick={guardarInfo} to={`/Pelicula/${peli.name}`}>
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
                                        <div className="divisionesbotones">
                                            <button className='menos5' onClick={menos}>-</button>
                                            <button className='mas5' onClick={mas}>+</button>
                                        </div>
                                    </section>
                                    :

                                    null
                            }
                            {
                                SeriesGuardadas.length > 0

                                    ?
                                    <section>
                                        <div className='divTitlePeliculas'>
                                            <span><FontAwesomeIcon icon={faStar} /></span><h2 className='titlePeliculas'>Tus Series favoritas</h2>
                                        </div>
                                        <div className='sectiondiv6'>
                                            <div className="containerMoviesTodas">
                                                <div className='MoviesTodas'>

                                                    {SeriesGuardadas.map((peli) => {
                                                        return (
                                                            <div

                                                                className={show === null ? "ContainerCards" : "ContainerActive"}
                                                                key={peli.id}
                                                                onMouseLeave={() => setShow(null)}
                                                                style={{
                                                                    background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${peli?.img2}) center top / cover no-repeat`,
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
                                        <div className="divisionesbotones">
                                            <button className='menos6' onClick={menos}>-</button>
                                            <button className='mas6' onClick={mas}>+</button>
                                        </div>
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

                                            {
                                                Estado !== pelis.id

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
