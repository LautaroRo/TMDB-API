import React, { useEffect, useState } from 'react'
import NavBar from "./../NavBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import "./estilos.css"
const Peilculas = () => {
    const [IDPelicula, setIDPelicula] = useState(0)
    const [Pelicula, setPelicula] = useState([])
    const [PeliBack, setPeliBack] = useState([])
    const [Categoria, setCagoria] = useState([])
    const [Almacenar, setAlmacenar] = useState([])
    const [Estado, setEstado] = useState(true)
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";

    const mostrar = (e) => {
        e.preventDefault()

        const almacenados = Almacenar.some((Almacen) => Almacen.name === PeliBack.name)
        if (almacenados) {
            const actualizados = Almacenar.filter((element) => element !== PeliBack)
            setAlmacenar(actualizados)
            console.log(Almacenar)
        } else {
            setAlmacenar([...Almacenar, PeliBack])
            console.log(Almacenar)
        }
        setEstado(!Estado)
    }
    useEffect(() => {
        console.log(Almacenar, "hola")
    }, [Almacenar])

    useEffect(() => {
        const buscarPelicula = async () => {
            const Buscar = await fetch(`https://api.themoviedb.org/3/movie/${IDPelicula}?api_key=${API_KEY}&append_to_response=credits`)
            const peliculaEncontrada = await Buscar.json()
            let infoaAlmacenada = []
            for (let i = 0; peliculaEncontrada?.credits?.cast?.length > i; i++) {

                let infoGuarda = {
                    name: peliculaEncontrada?.credits?.cast[i]?.original_name,
                    img: peliculaEncontrada?.credits?.cast[i]?.profile_path,
                    personaje: peliculaEncontrada?.credits?.cast[i]?.character,
                }
                console.log(infoGuarda.personaje)
                if (infoGuarda.img !== null) {
                    infoaAlmacenada.push(infoGuarda)
                }
            }

            setPelicula([...Pelicula, ...infoaAlmacenada])


            let InfoBack = {
                img: `https://image.tmdb.org/t/p/original${peliculaEncontrada?.backdrop_path}`,
                name: peliculaEncontrada?.title,
                description: peliculaEncontrada?.overview,
                poster: `https://image.tmdb.org/t/p/w500/${peliculaEncontrada?.poster_path}`,
                fecha: peliculaEncontrada?.release_date

            }

            setPeliBack(InfoBack)

            let category = []
            for (let i = 0; peliculaEncontrada?.genres?.length > i; i++) {
                let infoCategoria = { name: peliculaEncontrada?.genres[i]?.name }
                category.push(infoCategoria)
            }

            setCagoria(category)
        }
        buscarPelicula()
    }, [IDPelicula > 0])

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem("Pelicula-Seleccionada"))
        setIDPelicula(info)
    }, [])


    const mas = (e) => {
        e.preventDefault()

        const Mas = document.querySelector(".containerPeliculas")

        try {
            Mas.scrollLeft += 200
        }
        catch {
            Mas.scrollLeft += 200
        }
    }
    const menos = (e) => {
        e.preventDefault()

        const Mas = document.querySelector(".containerPeliculas")

        try {
            Mas.scrollLeft -= 200
        }
        catch {
            Mas.scrollLeft -= 200
        }
    }
    return (
        <>
            <NavBar />
            <div>
                <div style={{
                    background: `linear-gradient(rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.90) 100%),url(${PeliBack?.img})center / cover no-repeat`,
                    width: "100%",
                    height: "75.2vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}>

                    <div style={{
                        display: "flex",
                        justifyContent: "end"
                    }}>
                        <img className='imgPoster' src={PeliBack?.poster}></img>
                    </div>

                    <div className='containerInformacion'>
                        <h2 style={{
                            margin: "2em",
                            position: "relative",
                            bottom: "10px",
                            color: "white"
                        }}>{PeliBack?.name}<span>({PeliBack?.fecha})</span></h2>


                        <div className="divUl">
                            <ul>
                                {Categoria.map((categoria) => (
                                    <li>{categoria.name}</li>
                                ))}
                                {Estado === true
                                    ?

                                    <FontAwesomeIcon onClick={mostrar} className='iconoCorazon' icon={faHeart} />

                                    :

                                    <FontAwesomeIcon onClick={mostrar} className='iconoCorazonCompleted' icon={faHeart} />
                                }

                            </ul>

                        </div>
                        <p style={{
                            color: "white",
                            position: "relative",
                            top: "30px",
                            margin: "0 5%",
                            textAlign: "start",
                            width: "60%",
                            fontSize: "1.4em",
                            fontFamily: "serif",
                            letterSpacing: "2px"
                        }}>
                            {PeliBack?.description}
                        </p>
                    </div>
                </div>
                {Pelicula.length > 0
                    ?
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%"
                    }}>
                        <button className='buttons' onClick={menos}>-</button>
                        <div className='containerPeliculas'>
                            <div className="actores">
                                {Pelicula.map((peli) => (
                                    <div className='perfiles'>
                                        <div className='card frente' style={{
                                            background: `url(https://image.tmdb.org/t/p/w500/${peli?.img})`,
                                            backgroundSize: 'cover',

                                        }}>

                                        </div>
                                        <div className='card back'>
                                            <p className='nombreActor'>{peli?.name}</p>
                                            <p className='personaje'>{peli?.personaje}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <button className='buttons' onClick={mas}>+</button>
                    </div>
                    :
                    <h1>Waiting</h1>

                }

            </div>
        </>
    )
}

export default Peilculas
