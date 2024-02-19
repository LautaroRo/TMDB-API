import React, { useContext, useEffect, useState } from 'react'
import NavBar from "./../NavBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faLocationPinLock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./estilos.css"

import { Use } from '../../Context/Perfil'
const Peilculas = () => {
    const { info, start, mostrar, boton, Estado, PerfilIniciado, PeliBack, buscarPelicula, iniciar, IDPelicula, Categoria, Pelicula } = useContext(Use)

    const [Imagen, setImagen] = useState(false)



    useEffect(() => {
        start()
    }, []);


    useEffect(() => {

        buscarPelicula()

    }, [IDPelicula])

    useEffect(() => {
        iniciar()
    }, [info, PerfilIniciado,IDPelicula]);

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

                                <div onMouseLeave={() => setImagen(false)} className='PosicionesBotonesFav2'>
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
