import React, { useContext, useState, useEffect } from 'react'
import "./estilos.css"
import { ProfileCreation } from '../../Context/Profile'
import { guardarLocal } from '../Helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'
import foto1 from "./../../AssetsP/Fotoperfil1.jpeg"
import foto2 from "./../../AssetsP/Fotoperfil2.jpeg"
import foto3 from "./../../AssetsP/Fotoperfil3.jpeg"
import foto4 from "./../../AssetsP/Fotoperfil4.jpeg"
import foto5 from "./../../AssetsP/Fotoperfil5.jpeg"
import foto6 from "./../../AssetsP/Fotoperfil6.jpeg"
import foto7 from "./../../AssetsP/Fotoperfil7.jpeg"
import foto8 from "./../../AssetsP/Fotoperfil8.jpeg"
import foto9 from "./../../AssetsP/Fotoperfil9.jpeg"
import foto10 from "./../../AssetsP/Fotoperfil10.jpeg"
import foto11 from "./../../AssetsP/Fotoperfil11.jpeg"
import foto12 from "./../../AssetsP/Fotoperfil12.jpeg"
import foto13 from "./../../AssetsP/Fotoperfil13.jpeg"
import foto14 from "./../../AssetsP/Fotoperfil14.jpeg"
import foto15 from "./../../AssetsP/Fotoperfil15.jpeg"
import foto16 from "./../../AssetsP/Fotoperfil16.jpeg"

const Perfiles = () => {
    const { profile } = useContext(ProfileCreation)
    const [Estado, setEstado] = useState(false)
    const [Perfil, setPerfil] = useState([])
    const [Foto, setFoto] = useState([])
    const [ElegirFoto, setElegirFoto] = useState(-1)
    const [EstadoMain, setEstadoMain] = useState(false)
    const [ShowForm, setShowForm] = useState(false)
    const [NombreEditar, setNombreEditar] = useState()
    const [showFotos, setShowFotos] = useState(false)

    const Editar = (e) => {
        e.preventDefault()
        const urlNombre = JSON.parse(localStorage.getItem("nombres"));
        const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`));
        console.log(NombreEditar)
        const perfiles = []
        const fotos = Foto[ElegirFoto]
        for (let i = 0; perfilesCreados.length > i; i++) {

            if (perfilesCreados[i].nombre !== NombreEditar.nombre) {
                perfiles.push({ nombre: perfilesCreados[i].nombre, imagen: perfilesCreados[i].imagen })
            } else {
                perfiles.push({ nombre: e.target.nombre.value, imagen: fotos })
            }
        }
        localStorage.setItem(`Perfiles${urlNombre}`, JSON.stringify(perfiles))
        setPerfil(perfiles)
        setShowForm(false)
    }

    const showFormulario = (nombre) => {
        setNombreEditar(nombre)
        setShowForm(true)
    }


    const Delete = (e) => {
        const urlNombre = JSON.parse(localStorage.getItem("nombres"));
        const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`));

        const perfiles = []

        for (let i = 0; perfilesCreados?.length > i; i++) {
            if (perfilesCreados[i].nombre !== e.target.id) {
                let info = {
                    nombre: perfilesCreados[i].nombre,
                    imagen: perfilesCreados[i].imagen
                }
                perfiles.push(info)
            } else {
                console.log("eliminado")
            }
        }
        setPerfil(perfiles)
        localStorage.setItem(`Perfiles${urlNombre}`, JSON.stringify(perfiles))
    };


    useEffect(() => {
        const urlNombre = JSON.parse(localStorage.getItem("nombres"));
        const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`));
        if (perfilesCreados?.length > 0 && perfilesCreados) {
            setPerfil(perfilesCreados)
        }
        setFoto([
            foto1,
            foto2,
            foto3,
            foto4,
            foto5,
            foto6,
            foto7,
            foto8,
            foto9,
            foto10,
            foto11,
            foto12,
            foto13,
            foto14,
            foto15,
            foto16
        ])
    }, [])




    const crearPerfil = (e) => {
        e.preventDefault();
        const crearNombre = e.target.nombre.value
        const fotos = Foto[ElegirFoto]
        console.log(fotos)


        if (ElegirFoto > -1) {
            const urlNombre = JSON.parse(localStorage.getItem("nombres"));
            const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`));

            const perfil = []
            for (let i = 0; perfilesCreados?.length > i; i++) {
                perfil.push(perfilesCreados[i].nombre)
            }
            if (perfil?.includes(crearNombre) || Perfil.length > 4) {
                console.log("error: el perfil ya existe");
            } else {
                setEstado(false);
                setPerfil([...Perfil, { nombre: crearNombre, imagen: fotos }])

                guardarLocal(`Perfiles${urlNombre}`, { nombre: crearNombre, imagen: fotos })
                setElegirFoto(-1)
            }
        } else {
            console.log("error")
        }
    };



    const mas = (e) => {
        e.preventDefault()
        const scroll = document.querySelector(".ContainerFotos")

        try {
            scroll.scrollLeft += 300
        } catch {
            scroll.scrollLeft += 300
        }
    }


    const menos = (e) => {
        e.preventDefault()
        const scroll = document.querySelector(".ContainerFotos")

        try {
            scroll.scrollLeft -= 300
        } catch {
            scroll.scrollLeft -= 300
        }
    }

    return (


        <div className={Estado === false ? 'containerPerfiles' : 'FalsecontainerPerfiles'}>
            <div className="Perfiles">
                {Perfil.map((perfil) => {
                    return (
                        <>
                            {
                                EstadoMain === false

                                    ?

                                    <div className={Estado === false ? 'cardPelis' : 'FalsecardPelis'}>
                                        <div className="perfil" onClick={Delete} id={perfil.nombre} style={{
                                            background: `url(${perfil?.imagen}) center/ cover no-repeat`,
                                            width: "12em",
                                            height: "12em",
                                            display: "flex",
                                            borderRadius: "100px",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}></div>
                                        {perfil.nombre}
                                    </div>

                                    :

                                    <div className={Estado === false ? 'cardPelis' : 'FalsecardPelis'}>
                                        <div className="perfil" onClick={Delete} id={perfil.nombre} style={{
                                            background: `url(${perfil?.imagen}) center/ cover no-repeat`,
                                            width: "12em",
                                            height: "12em",
                                            display: "flex",
                                            borderRadius: "100px",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <button className='btonCard' onClick={() => showFormulario(perfil)}><FontAwesomeIcon className='iconPencil' icon={faPencil} /></button>
                                        </div>
                                        {perfil.nombre}
                                    </div>
                            }
                        </>
                    )
                })}

                {
                    ShowForm === true
                        ?
                        <>

                            <div className='divContainerEditar'>
                                <h2>Editar Perfil</h2>
                                <form onSubmit={Editar}>
                                    <div className='divPerfil'>
                                        <img onClick={() => setShowFotos(!showFotos)} src={NombreEditar.imagen} />
                                        <div className='inputNombre'>
                                            <input name='nombre' type="text" placeholder={NombreEditar.nombre} />
                                            <label>Ingresar Nombre</label>
                                        </div>
                                        <button type='submit'>Subir</button>
                                    </div>
                                </form>
                            </div>
                            {showFotos === true

                                ?
                                <div className='changeFoto'>
                                    <img onClick={() => setElegirFoto(0)} src={foto1} />
                                    <img onClick={() => setElegirFoto(1)} src={foto2} />
                                    <img onClick={() => setElegirFoto(2)} src={foto3} />
                                    <img onClick={() => setElegirFoto(3)} src={foto4} />
                                    <img onClick={() => setElegirFoto(4)} src={foto5} />
                                    <img onClick={() => setElegirFoto(5)} src={foto6} />
                                    <img onClick={() => setElegirFoto(6)} src={foto7} />
                                    <img onClick={() => setElegirFoto(7)} src={foto8} />
                                    <img onClick={() => setElegirFoto(8)} src={foto9} />
                                    <img onClick={() => setElegirFoto(9)} src={foto10} />
                                    <img onClick={() => setElegirFoto(10)} src={foto11} />
                                    <img onClick={() => setElegirFoto(11)} src={foto12} />
                                    <img onClick={() => setElegirFoto(12)} src={foto13} />
                                    <img onClick={() => setElegirFoto(13)} src={foto14} />
                                    <img onClick={() => setElegirFoto(14)} src={foto15} />
                                    <img onClick={() => setElegirFoto(15)} src={foto16} />
                                </div>

                                :
                                null
                            }
                        </>
                        :
                        null

                }


                {Estado === false ? (
                    <div className="divCreatePerfil">
                        <div onClick={() => setEstado(true)} className="CreatePerfil">
                            <button><FontAwesomeIcon className='icon' icon={faPlus} /></button>
                        </div>
                    </div>
                ) : (
                    <div className="formCreate">
                        <form className='Formulario' onSubmit={crearPerfil}>
                            <div className="inputNombre">
                                <input name='nombre' type="text" />
                                <label>Ingresar Nombre</label>
                            </div>
                            <button onClick={mas}>+</button>
                            <div className="ContainerFotos">
                                <img onClick={() => setElegirFoto(0)} src={foto1} />
                                <img onClick={() => setElegirFoto(1)} src={foto2} />
                                <img onClick={() => setElegirFoto(2)} src={foto3} />
                                <img onClick={() => setElegirFoto(3)} src={foto4} />
                                <img onClick={() => setElegirFoto(4)} src={foto5} />
                                <img onClick={() => setElegirFoto(5)} src={foto6} />
                                <img onClick={() => setElegirFoto(6)} src={foto7} />
                                <img onClick={() => setElegirFoto(7)} src={foto8} />
                                <img onClick={() => setElegirFoto(8)} src={foto9} />
                                <img onClick={() => setElegirFoto(9)} src={foto10} />
                                <img onClick={() => setElegirFoto(10)} src={foto11} />
                                <img onClick={() => setElegirFoto(11)} src={foto12} />
                                <img onClick={() => setElegirFoto(12)} src={foto13} />
                                <img onClick={() => setElegirFoto(13)} src={foto14} />
                                <img onClick={() => setElegirFoto(14)} src={foto15} />
                                <img onClick={() => setElegirFoto(15)} src={foto16} />
                            </div>
                            <button onClick={menos}>-</button>
                            <button type='submit'>Subir</button>
                        </form>
                    </div>
                )}
            </div>
            <div className="btonsdiv">
                {
                    EstadoMain === false

                        ?

                        <button onClick={() => setEstadoMain(true)}>Administrar Perfiles</button>

                        :
                        <button><FontAwesomeIcon icon={faCheck} /></button>
                }

            </div>
        </div>
    )
}
export default Perfiles


/*--
                            {showFotos === true

                                ?
                                <div className='changeFoto'>
                                    <img onClick={() => setElegirFoto(0)} src={foto1} />
                                    <img onClick={() => setElegirFoto(1)} src={foto2} />
                                    <img onClick={() => setElegirFoto(2)} src={foto3} />
                                    <img onClick={() => setElegirFoto(3)} src={foto4} />
                                    <img onClick={() => setElegirFoto(4)} src={foto5} />
                                    <img onClick={() => setElegirFoto(5)} src={foto6} />
                                    <img onClick={() => setElegirFoto(6)} src={foto7} />
                                    <img onClick={() => setElegirFoto(7)} src={foto8} />
                                    <img onClick={() => setElegirFoto(8)} src={foto9} />
                                    <img onClick={() => setElegirFoto(9)} src={foto10} />
                                    <img onClick={() => setElegirFoto(10)} src={foto11} />
                                    <img onClick={() => setElegirFoto(11)} src={foto12} />
                                    <img onClick={() => setElegirFoto(12)} src={foto13} />
                                    <img onClick={() => setElegirFoto(13)} src={foto14} />
                                    <img onClick={() => setElegirFoto(14)} src={foto15} />
                                    <img onClick={() => setElegirFoto(15)} src={foto16} />
                                </div>

                                :
                                null
                            }

--*/