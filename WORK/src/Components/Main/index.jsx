import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faeqw} from "@fortawesome/free-solid-svg-icons"
import "./estilos.css"
const Main = () => {

    const [Movies, setMovies] = useState([])
    const [show, setShow] = useState(null)
    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";
    const divScroll = document.querySelector(".sectiondiv")
    const traerTodasPeliculas = async () => {
        try {
            let peliculas = []

            for (let j = 0; 5 > j; j++) {

                let url = `${API}/movie/popular?api_key=${API_KEY}&page=${j}`;
                const response = await fetch(url)
                const data = await response.json()


                for (let j = 0; data?.results?.length > j; j++) {
                    let img = data.results[j].poster_path
                    let img2 = data.results[j].backdrop_path

                    const Imagenes = `https://image.tmdb.org/t/p/original${img}`;
                    const Imagenes2 = `https://image.tmdb.org/t/p/original${img2}`;
                    console.log(data)
                    if (img) {
                        let name = data.results[j].title
                        let id = data.results[j].id;
                        const critic = data.results[j].vote_average;
                        const criticPercentage = (parseFloat(critic) * 10).toFixed(1);
                        let info = {
                            name: name,
                            id: id,
                            img: Imagenes,
                            img2: Imagenes2,
                            critic:criticPercentage,
                        }
                        peliculas.push(info)

                    }

                }
            }
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

        try {
            divScroll.scrollLeft += 300
        }
        catch {
            divScroll.scrollLeft += 300
        }
    }
    const menos = (e) => {
        e.preventDefault()

        try {
            divScroll.scrollLeft -= 300
        }
        catch {
            divScroll.scrollLeft -= 300
        }
    }

    console.log(Movies)
    return (
        <main>
            <div>
                <h2>Peliculas</h2>
                <button className='menos' onClick={menos}>
                    -
                </button>
                <div className='sectiondiv'>
                    <div className="containerMoviesTodas">
                        <div className='MoviesTodas'>

                            {Movies.map((pelis) => {
                                return (
                                    <div className={show === null ?"ContainerCards" : "ContainerActive"} key={pelis.id}
                                    
                                        style={{background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${pelis?.img2}) center top / cover no-repeat`,
                                        width:"100%",
                                        height:"100%"}}
                                    >
                                        <div className="divInside">
                                            <img className='img' onMouseEnter={() => setShow(pelis.id)}  onMouseLeave={() => setShow(null)} src={pelis.img}></img>
                                        </div>
                                        <div className="p" >
                                        {show === pelis.id && (
                                            <div className='Show'>
                                                <h2>{pelis.name}</h2>
                                                <p>{pelis.critic}%</p>
                                                <span><FontAwesomeIcon icon={faeqw}/></span>
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
            </div>
        </main>
    )

}

export default Main


/*--
}--*/


/*--
    const traerMejoresPeliculas = async() => {

        for(let i = 0; 300 > i; i++){
            let url = `${API}/movie/top_rated?api_key=${API_KEY}&page=1`;
            const response = await fetch(url)
            const data = await response.json()
        }

        
    }--*/

/*--
    useEffect(()=>{
        //traerMejoresPeliculas()
        traerTodasPeliculas()
    },[])
--*/

