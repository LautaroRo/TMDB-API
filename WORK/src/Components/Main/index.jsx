import React, { useState, useEffect } from 'react'
import pop from "./../../Assets/pop.png"
import play from "./../../Assets/play.png"
import "./estilos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import NavBar from '../NavBar'
const Main = () => {

    const [Movies, setMovies] = useState([])
    const [Movies2, setMovies2] = useState([])
    const [show, setShow] = useState(null)
    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";

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



    useEffect(() => {
        traerTodasPeliculas()

    }, [])


    const mas = (e) => {
        e.preventDefault()
        const divScroll = document.querySelector(".sectiondiv")

        try {
            divScroll.scrollLeft += 300
        }
        catch {
            divScroll.scrollLeft += 300
        }



    }
    const menos = (e) => {
        e.preventDefault()
        const divScroll = document.querySelector(".sectiondiv")

        try {
            divScroll.scrollLeft -= 300
        }
        catch {
            divScroll.scrollLeft -= 300
        }



    }


    const mas2 = (e) => {
        e.preventDefault();
        const divScroll2 = document.querySelector(".sectiondiv2")
        try {
            divScroll2.scrollLeft += 300;
        } catch {
            divScroll2.scrollLeft += 300;
        }
    };

    const menos2 = (e) => {
        e.preventDefault();


        const divScroll2 = document.querySelector(".sectiondiv2")
        try {
            divScroll2.scrollLeft -= 300;
        } catch {
            divScroll2.scrollLeft -= 300;
        }

    };

    return (
        <>
        <NavBar/>
        <Header/>
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
                                                <div className="Show">
                                                    <h2>{pelis.name}</h2>
                                                    <div className="showdiv">
                                                        <span>
                                                            <img src={pop} alt="Popularity" />
                                                        </span>
                                                        <p>{pelis.critic}/10</p>
                                                    </div>
                                                    <a>
                                                        <FontAwesomeIcon className='icono' icon={faPlay}/>
                                                    </a>
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
                <button className='menos2' onClick={menos2}>
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
                                                    <a>
                                                        <img src={play} alt="Play" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                )
                            })}

                        </div>
                    </div>
                </div>
                <button className='mas2' onClick={mas2}>
                    +
                </button>
            </section>
        </main>
        </>
    )

}

export default Main
