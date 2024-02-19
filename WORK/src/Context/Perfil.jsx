import React, { createContext, useState } from 'react'
import { guardarLocal } from '../Components/Helper'
import {toast } from 'react-toastify';
export const Use = createContext()

const Perfil = ({children}) => {

    const [PeliBuscar, setPeliBuscar] = useState([])
    const [change, setChange] = useState()


    const [Movies, setMovies] = useState([])
    const [Movies2, setMovies2] = useState([])
    const [Series, setSeries] = useState([])
    const [Series2, setSeries2] = useState([])
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
            console.log("hola")
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




    const [info, setInfo] = useState();
    const [guardado, setGuardado] = useState();
    const [PerfilIniciado, setPerfilIniciado] = useState([])
    const [PeliBack, setPeliBack] = useState([])
    const [boton, setBoton] = useState("iconoCorazon")
    const [Estado, setEstado] = useState(true)
    const [IDPelicula, setIDPelicula] = useState(0)
    const [Pelicula, setPelicula] = useState([])
    const [Categoria, setCagoria] = useState([])


    const start = () => {   
            const infoData = JSON.parse(localStorage.getItem("Pelicula-Seleccionada"));
            const guardadoData = JSON.parse(localStorage.getItem("Perfil-Iniciado"));
    
            if (infoData && guardadoData) {
                setInfo(infoData);
                setGuardado(guardadoData);
            }


    }


    const mostrar = (e) => {
        e.preventDefault()
        const nombre = JSON.parse(localStorage.getItem("nombres"))

            const buscar = JSON.parse(localStorage.getItem(`PelisGuardadas${nombre}+${PerfilIniciado[0]?.nombre}`))

            if(buscar === null){
                guardarLocal(`PelisGuardadas${nombre}+${PerfilIniciado[0]?.nombre}`, PeliBack)

                setEstado(!Estado) 
                setBoton("iconoCorazonCompleted")
            }else{
                const almacenados = buscar.some((Almacen) => Almacen.name === PeliBack.name)

                if (almacenados) {
                    const actualizados = buscar.filter((element) => element.name !== PeliBack.name)

                    localStorage.setItem(`PelisGuardadas${nombre}+${PerfilIniciado[0]?.nombre}`, JSON.stringify(actualizados))
                    setBoton("iconoCorazon")
                    toast.warn("Se elimino de tus favoritos", {
                    position:"bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                    }
                    )
                } else {
                    guardarLocal(`PelisGuardadas${nombre}+${PerfilIniciado[0]?.nombre}`, PeliBack)
                    setBoton("iconoCorazonCompleted")
                    toast.success("Se agrego a tus favoritos", {
                        position:"bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                        }
                        )
                }
            }
            setEstado(!Estado) 
        
    }

    const buscarPelicula = async () => {
        setPelicula([])
        if (IDPelicula) {
            const Buscar = await fetch(`https://api.themoviedb.org/3/movie/${IDPelicula}?api_key=${API_KEY}&append_to_response=credits`)
            const peliculaEncontrada = await Buscar.json()
            let infoaAlmacenada = []

            if( peliculaEncontrada?.credits?.cast?.length < 7){
                for (let i = 0; i < peliculaEncontrada?.credits?.cast?.length ; i++) {

                    let infoGuarda = {
                        name: peliculaEncontrada?.credits?.cast[i]?.original_name,
                        img: peliculaEncontrada?.credits?.cast[i]?.profile_path,
                        personaje: peliculaEncontrada?.credits?.cast[i]?.character,
                    }
    
                    if (infoGuarda.img !== null) {
                        infoaAlmacenada.push(infoGuarda)
                    }
                }
            }else{
                for (let i = 0; i < 6 ; i++) {

                    let infoGuarda = {
                        name: peliculaEncontrada?.credits?.cast[i]?.original_name,
                        img: peliculaEncontrada?.credits?.cast[i]?.profile_path,
                        personaje: peliculaEncontrada?.credits?.cast[i]?.character,
                    }
    
                    if (infoGuarda.img !== null) {
                        infoaAlmacenada.push(infoGuarda)
                    }
                }
            }
            setPelicula([...Pelicula, ...infoaAlmacenada])

                const voto = peliculaEncontrada?.vote_average?.toFixed(1)
            let InfoBack = {
                img1: `https://image.tmdb.org/t/p/original${peliculaEncontrada?.poster_path}`,
                img2: `https://image.tmdb.org/t/p/original${peliculaEncontrada?.backdrop_path}`,
                name: peliculaEncontrada?.title,
                description: peliculaEncontrada?.overview,
                fecha: peliculaEncontrada?.release_date,
                id: peliculaEncontrada?.id,
                critic: voto
            }
            console.log(InfoBack?.id)
            setPeliBack(InfoBack)

            let category = []
            for (let i = 0; peliculaEncontrada?.genres?.length > i; i++) {
                let infoCategoria = { name: peliculaEncontrada?.genres[i]?.name }
                category.push(infoCategoria)
            }

            setCagoria(category)
        }
    }

    const iniciar = () => {
        setBoton(null)
        const nombre = JSON.parse(localStorage.getItem("nombres"))
        if (info && guardado) {
            setPerfilIniciado(guardado);
            setIDPelicula(info);
            
            const guardadoLocal = JSON.parse(localStorage.getItem(`PelisGuardadas${nombre}+${PerfilIniciado[0]?.nombre}`));
            if (guardadoLocal !== null) {
                let ID = [];
                for (let i = 0; guardadoLocal.length > i; i++) {
                    ID.push(guardadoLocal[i].id);
                }
                

                const confirmacion = ID.toString().includes(info.toString());
                if (confirmacion) {
                    const boton = document.querySelector(".iconoCorazon");
                    boton?.classList?.add("iconoCorazonCompleted");
                    setBoton("iconoCorazonCompleted")
                }
                
            }
        }
    }

    const vaciar = (e) => {
        e.preventDefault()
        setPeliBuscar([])
        setChange(null)
    }
    return (
        <Use.Provider value ={{PeliBuscar,setPeliBuscar,change, setChange,vaciar, Movies, Movies2, traerTodasPeliculas,traerTodaslasSeries, Series, Series2,setInfo,info , setGuardado, start, guardado,mostrar,boton,Estado,PerfilIniciado,setPeliBack,PeliBack,setPerfilIniciado,setBoton,buscarPelicula,iniciar,IDPelicula,Categoria,Pelicula}}>
            {children}
        </Use.Provider>
    )
}

export default Perfil