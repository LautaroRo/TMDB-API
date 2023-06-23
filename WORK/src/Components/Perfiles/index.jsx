import React, { useContext, useState, useEffect } from 'react'
import "./estilos.css"
import { ProfileCreation } from '../../Context/Profile'

const Perfiles = () => {

    const { profile } = useContext(ProfileCreation)
    const [Perfiles, setPerfiles] = useState([])
    const [Estado, setEstado] = useState(false)


    useEffect(() => {
        if(profile){
            setPerfiles([profile])
        }
    },[profile])

    const crearPerfil = (e) => {
        e.preventDefault()
        const crearNombre = e.target.nombre.value

        let perfil = {
            name: crearNombre
        }

        setPerfiles([...Perfiles, perfil])
        setEstado(false)
    }



    return (
        <>
            {
                !profile && Perfiles.length > 0

                    ?
                    null
                    :
                    <div className='containerPerfiles'>
                        <div className="Perfiles">

                            {Perfiles.map((perfil) => {
                                return (
                                    <div className='cardPelis'>
                                        <div className="perfil">
                                        </div>
                                        {perfil.name}
                                    </div>)
                            })}


                            {
                                Estado === false

                                    ?
                                    <div className="divCreatePerfil">
                                        <div onClick={() => setEstado(true)} className="CreatePerfil">
                                        </div>
                                        <p>Crear</p>
                                    </div>
                                    :
                                    <div className="formCeate">
                                        <form onSubmit={crearPerfil}>
                                            <input name='nombre' type="text" />
                                        </form>
                                    </div>
                            }


                        </div>
                    </div>
            }
        </>
    )
}

export default Perfiles