import React, { useContext, useState, useEffect } from 'react'
import "./estilos.css"
import { ProfileCreation } from '../../Context/Profile'
import { guardarLocal } from '../Helper'

const Perfiles = () => {
    const { profile } = useContext(ProfileCreation)
    const [Estado, setEstado] = useState(false)
    const [Perfil, setPerfil] = useState([])



    useEffect(() => {
        const urlNombre = JSON.parse(localStorage.getItem("nombres"));
        const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`)) || [];;
        setPerfil(perfilesCreados)
    }, [])

    const crearPerfil = (e) => {
        e.preventDefault();
        const crearNombre = e.target.nombre.value;


        const urlNombre = JSON.parse(localStorage.getItem("nombres"));
        const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`));

        if (perfilesCreados?.includes(crearNombre)  || Perfil.length > 4) {
            console.log("error: el perfil ya existe");
        } else {
            setEstado(false);
            setPerfil([...Perfil, crearNombre])

            guardarLocal(`Perfiles${urlNombre}`, crearNombre)
        }
    };

    return (


        <div className='containerPerfiles'>
            <div className="Perfiles">
            {Perfil.map((perfil) => {
                    return (
                        <div className='cardPelis'>
                            <div className="perfil"></div>
                            {perfil}
                        </div>
                    )
                })}

                {Estado === false ? (
                    <div className="divCreatePerfil">
                        <div onClick={() => setEstado(true)} className="CreatePerfil"></div>
                        <p>Crear</p>
                    </div>
                ) : (
                    <div className="formCeate">
                        <form onSubmit={crearPerfil}>
                            <input name='nombre' type="text" />
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Perfiles