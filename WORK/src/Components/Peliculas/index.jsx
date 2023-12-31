import React, { useContext, useEffect, useState } from 'react'
import NavBar from "./../NavBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faLocationPinLock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./estilos.css"
import { guardarLocal } from '../Helper'
import { Use } from '../../Context/Perfil'
const Peilculas = () => {
    const { setPeliBuscar,Pelibuscar} = useContext(Use)
    const [IDPelicula, setIDPelicula] = useState(0)
    const [Pelicula, setPelicula] = useState([])
    const [PeliBack, setPeliBack] = useState([])
    const [Categoria, setCagoria] = useState([])
    const [Almacenar, setAlmacenar] = useState([])
    const [Estado, setEstado] = useState(true)
    const [PerfilIniciado, setPerfilIniciado] = useState([])
    const [info, setInfo] = useState();
    const [guardado, setGuardado] = useState();
    const [Imagen, setImagen] = useState(false)
    const [boton, setBoton] = useState("iconoCorazon")
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";


    useEffect(() => {
        const infoData = JSON.parse(localStorage.getItem("Pelicula-Seleccionada"));
        const guardadoData = JSON.parse(localStorage.getItem("Perfil-Iniciado"));

        if (infoData && guardadoData) {
            setInfo(infoData);
            setGuardado(guardadoData);
        }
    }, []);

    const mostrar = (e) => {
        e.preventDefault()
        const nombre = JSON.parse(localStorage.getItem("nombres"))

            const buscar = JSON.parse(localStorage.getItem(`PelisGuardadas${nombre}+${PerfilIniciado[0]?.nombre}`))
            console.log(buscar)
            let Almacenar = [];
            if(buscar === null){
                guardarLocal(`PelisGuardadas${nombre}+${PerfilIniciado[0]?.nombre}`, PeliBack)
                setAlmacenar(PeliBack)
                setEstado(!Estado) 
                setBoton("iconoCorazonCompleted")
            }else{
                const almacenados = buscar.some((Almacen) => Almacen.name === PeliBack.name)

                if (almacenados) {
                    const actualizados = buscar.filter((element) => element.name !== PeliBack.name)
                    setAlmacenar(actualizados)
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
                    setAlmacenar([...Almacenar, PeliBack])
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

    

    useEffect(() => {
        const buscarPelicula = async () => {
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
                    console.log(voto)
                let InfoBack = {
                    img1: `https://image.tmdb.org/t/p/original${peliculaEncontrada?.poster_path}`,
                    img2: `https://image.tmdb.org/t/p/original${peliculaEncontrada?.backdrop_path}`,
                    name: peliculaEncontrada?.title,
                    description: peliculaEncontrada?.overview,
                    fecha: peliculaEncontrada?.release_date,
                    id: peliculaEncontrada?.id,
                    critic: voto
                }
                console.log(InfoBack)

                setPeliBack(InfoBack)

                let category = []
                for (let i = 0; peliculaEncontrada?.genres?.length > i; i++) {
                    let infoCategoria = { name: peliculaEncontrada?.genres[i]?.name }
                    category.push(infoCategoria)
                }

                setCagoria(category)
            }
        }
        buscarPelicula()
    }, [IDPelicula > 0])

    useEffect(() => {


        const nombre = JSON.parse(localStorage.getItem("nombres"))
        if (info && guardado) {
            setPerfilIniciado(guardado);
            setIDPelicula(info);
            
            const guardadoLocal = JSON.parse(localStorage.getItem(`PelisGuardadas${nombre}+${PerfilIniciado[0]?.nombre}`));
            if (guardadoLocal !== null) {
                setAlmacenar(guardadoLocal)
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


}, [info, PerfilIniciado]);

    useEffect(()=>{

    },[])
    return (
        <>
            <NavBar />
            <ToastContainer></ToastContainer>
            <div>
                <div className='ContainerBusqueda' style={{
                    background: `linear-gradient(rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.90) 100%),url(${PeliBack?.img2})center / cover no-repeat`,
                    width: "100%",
                    borderRadius: "0px",
                    position: "relative",
                }}>

                    <div className='MediaFoto' style={{
                        display: "flex",
                        justifyContent: "end",
                        position: "relative",
                        top: "50px"
                    }}>
                        <img className='imgPoster1' src={PeliBack?.img1}></img>
                        <img onMouseEnter={() => setImagen(true)} className={Imagen === true ? 'ImgBoton' : 'imgPoster'} src={PeliBack?.img1}></img>
                        {
                            Imagen === true

                                ?

                                <div onMouseLeave={() => setImagen(false)}  className='PosicionesBotonesFav2'>
                                    {Estado === true
                                        ?

                                        <FontAwesomeIcon onClick={mostrar} className={boton} icon={faHeart} />

                                        :

                                        <FontAwesomeIcon onClick={mostrar} className={boton} icon={faHeart} />
                                    }
                                </div>
                                :
                                null
                        }

                    </div>

                    <div className='containerInformacion'>
                        <h2 style={{
                            margin: "2em 0em",
                            position: "relative",
                            bottom: "10px",
                            color: "white"
                        }}>{PeliBack?.name}<span>({PeliBack?.fecha})</span></h2>


                        <div className="divUl">
                            <ul>
                                {Categoria.map((categoria) => (
                                    <li>{categoria.name}</li>
                                ))}
                            </ul>

                        </div>
                        <p className='Description'>
                            {PeliBack?.description}
                        </p>
                        <div className="Actores">
                            {Pelicula.map((peli) => (
                                <div className='perfiles'>
                                    <div className='card frente' style={{
                                        background: `url(https://image.tmdb.org/t/p/w500/${peli?.img}) center center / cover`,
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
                </div>
                <div className='PosicionesBotonesFav'>
                    {
                            Estado === true
                            ?
                            <FontAwesomeIcon onClick={mostrar} className='iconoCorazon' icon={faHeart} />
                            :
                            <FontAwesomeIcon onClick={mostrar} className='iconoCorazonCompleted' icon={faHeart} />
                    }
                </div>
            </div>
        </>
    )
}

export default Peilculas
