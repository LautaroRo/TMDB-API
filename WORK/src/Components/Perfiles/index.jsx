import React, { useContext, useState, useEffect } from 'react'
import "./estilos.css"
import { guardarLocal } from '../Helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencil, faCheck, faX,  } from '@fortawesome/free-solid-svg-icons'
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
import fotoMar from "./../../Assets/gifMar.gif"
import { NavLink,  } from 'react-router-dom'

const Perfiles = () => {
    const [Estado, setEstado] = useState(false)
    const [Perfil, setPerfil] = useState([])
    const [Foto, setFoto] = useState([])
    const [ElegirFoto, setElegirFoto] = useState(-1)
    const [EstadoMain, setEstadoMain] = useState(false)
    const [ShowForm, setShowForm] = useState(false)
    const [NombreEditar, setNombreEditar] = useState()
    const [showFotos, setShowFotos] = useState(false)
    const [Background, setBackground] = useState()

    const Editar = (e) => {
        e.preventDefault()
        const urlNombre = JSON.parse(localStorage.getItem("nombres"));
        const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`));
        const perfiles = []
        for (let i = 0; perfilesCreados.length > i; i++) {
            if (perfilesCreados[i].nombre !== NombreEditar.nombre) {
                perfiles.push({ nombre: perfilesCreados[i].nombre, imagen: perfilesCreados[i].imagen })
            } else {
                perfiles.push({ nombre: e.target.nombre.value || NombreEditar.nombre, imagen: NombreEditar.imagen })
            }
        }
        localStorage.setItem(`Perfiles${urlNombre}`, JSON.stringify(perfiles))
        setPerfil(perfiles)
        setShowForm(false)
    }

    const mostrarFotos = (e) => {
        const fotos = Foto[e.target.id];
        let info = {
            nombre: NombreEditar.nombre,
            imagen: fotos
        };
        setShowFotos(false);
        setNombreEditar(info);
        setBackground(info)
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

    const SubirPerfil = (e) => {
        const urlNombre = JSON.parse(localStorage.getItem("nombres"));
        const perfilesCreados = JSON.parse(localStorage.getItem(`Perfiles${urlNombre}`));

        const buscarPerfil = perfilesCreados.filter(element => element.nombre === e.target.id)
        localStorage.setItem("Perfil-Iniciado", JSON.stringify(buscarPerfil))
    }

    const cambiarImagen = (e) => {
        e.preventDefault();
        const fotoAnterior = document.querySelector(".activoFoto");
        fotoAnterior?.classList?.remove("activoFoto");
        e?.target?.classList?.add("activoFoto");
        setElegirFoto(e.target.id);
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

                                    <div id="cardP" className={Estado === false ? 'cardPelis' : 'FalsecardPelis'}>
                                        <NavLink onClick={SubirPerfil} to={`/inicio`} className="perfil" id={perfil.nombre} style={{
                                            background: `url(${perfil?.imagen}) center/ cover no-repeat`
                                        }}></NavLink>
                                        {perfil.nombre}
                                    </div>

                                    :

                                    <div id='card2' className={Estado === false ? 'cardPelis' : 'FalsecardPelis'}>
                                        <div className="perfil" id={perfil.nombre} style={{
                                            background: `url(${perfil?.imagen}) center/ cover no-repeat`,
                                            borderRadius: "100%"
                                        }}>
                                        </div>
                                        {perfil.nombre}
                                        <button className='btonCardX' id={perfil.nombre} onClick={Delete}><FontAwesomeIcon className='iconX' icon={faX} /></button>
                                        <button className='btonCard' onClick={() => showFormulario(perfil)}><FontAwesomeIcon className='iconPencil' icon={faPencil} /></button>
                                    </div>
                            }
                        </>
                    )
                })}
                {
                Estado === false
                    ?
                    <div id="div2" className="btonsdiv">
                        {
                            EstadoMain === false

                                ?
                                <>
                                    <button className='administrarPerfiles' onClick={() => setEstadoMain(true)}>Administrar Perfiles</button>
                                    <div className="divCreatePerfil">
                                        <div onClick={() => setEstado(true)} className="CreatePerfil">
                                            <button><FontAwesomeIcon className='icon' icon={faPlus} /></button>
                                        </div>
                                    </div>

                                </>
                                :
                                
                                <div className='divBtonsCheck'>
                                    <button className='Check' onClick={() => setEstadoMain(false)} ><FontAwesomeIcon icon={faCheck} /></button>
                                </div>
                        }

                    </div>
                    :
                    <div className="formCreate" style={{
                        background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${fotoMar}) center / cover no-repeat`,
                        width: "100%",
                        height: "105vh"
                    }}>
                        <form className='Formulario' onSubmit={crearPerfil}>
                            <div className="inputNombre">
                                <input name='nombre' type="text" required minLength={4} />
                                <label>Ingresar Nombre</label>
                            </div>
                            <div className="ContainerFotos">
                                <div id="0" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto1}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="1" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto2}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer"
                                }} />
                                <div id="2" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto3}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="3" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto4}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="4" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto5}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="5" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto6}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="6" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto7}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="7" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto8}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="8" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto9}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="9" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto10}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="10" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto11}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="11" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto12}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="12" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto13}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="13" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto14}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="14" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto15}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="15" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto16}) center / cover no-repeat`,
                                    width: "10em",
                                    height: "10em",
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                            </div>
                            <button className='btonSubir' type='submit'>Subir</button>
                        </form>
                    </div>

            }





                {
                    ShowForm === true
                        ?
                        <>

                            <div className='divContainerEditar' style={{
                                background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${Background?.imagen}) center top / cover no-repeat`,
                                width: "100%",
                                height: "105vh"
                            }}>
                                <FontAwesomeIcon onClick={() => setShowForm(false)} className='iconVolver' icon={faX}/>
                                <form onSubmit={Editar}>
                                    <div className='divPerfil'>
                                        <img onClick={() => setShowFotos(true)}
                                            src={NombreEditar?.imagen} />
                                        <div className='inputNombre'>
                                            <input name='nombre' type="text" placeholder={NombreEditar.nombre} />
                                            <label>Ingresar Nombre</label>
                                            <button className='button2'>subir</button>
                                        </div>
                                        <button className='button1' type='submit'>Subir</button>
                                    </div>
                                </form>
                                <div className='changeFoto'>
                                    <img id="0" onClick={mostrarFotos} src={foto1} />
                                    <img id="1" onClick={mostrarFotos} src={foto2} />
                                    <img id="2" onClick={mostrarFotos} src={foto3} />
                                    <img id="3" onClick={mostrarFotos} src={foto4} />
                                    <img id="4" onClick={mostrarFotos} src={foto5} />
                                    <img id="5" onClick={mostrarFotos} src={foto6} />
                                    <img id="6" onClick={mostrarFotos} src={foto7} />
                                    <img id="7" onClick={mostrarFotos} src={foto8} />
                                    <img id="8" onClick={mostrarFotos} src={foto9} />
                                    <img id="9" onClick={mostrarFotos} src={foto10} />
                                    <img id="10" onClick={mostrarFotos} src={foto11} />
                                    <img id="11" onClick={mostrarFotos} src={foto12} />
                                    <img id="12" onClick={mostrarFotos} src={foto13} />
                                    <img id="13" onClick={mostrarFotos} src={foto14} />
                                    <img id="14" onClick={mostrarFotos} src={foto15} />
                                    <img id="15" onClick={mostrarFotos} src={foto16} />
                                </div>
                            </div>
                        </>
                        :
                        null

                }
            </div>

            {
                Estado === false
                    ?
                    <div id="div1" className="btonsdiv">
                        {
                            EstadoMain === false

                                ?
                                <>
                                    <button className='administrarPerfiles' onClick={() => setEstadoMain(true)}>Administrar Perfiles</button>
                                    <div className="divCreatePerfil">
                                        <div onClick={() => setEstado(true)} className="CreatePerfil">
                                            <button><FontAwesomeIcon className='icon' icon={faPlus} /></button>
                                        </div>
                                    </div>

                                </>
                                :
                                <div className='divBtonsCheck'>
                                    <button className='Check' onClick={() => setEstadoMain(false)} ><FontAwesomeIcon icon={faCheck} /></button>
                                </div>
                                
                        }

                    </div>
                    :
                    <div className="formCreate" style={{
                        background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${fotoMar}) center / cover no-repeat`,
                        width: "100%",
                        height: "105vh"
                    }}>
                        <form className='Formulario' onSubmit={crearPerfil}>
                            <div className="inputNombre">
                                <input name='nombre' type="text" required minLength={4} />
                                <label>Ingresar Nombre</label>
                            </div>
                            <div className="ContainerFotos">
                                <div id="0" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto1}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="1" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto2}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer"
                                }} />
                                <div id="2" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto3}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="3" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto4}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="4" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto5}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="5" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto6}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="6" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto7}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="7" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto8}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="8" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto9}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="9" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto10}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="10" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto11}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="11" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto12}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="12" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto13}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="13" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: `url(${foto14}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="14" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto15}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                                <div id="15" className='imgCrear' onClick={cambiarImagen} style={{
                                    background: ` url(${foto16}) center / cover no-repeat`,
                                    margin: "1em",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }} />
                            </div>
                            <button className='btonSubir' type='submit'>Subir</button>
                        </form>
                    </div>

            }

        </div>
    )
}
export default Perfiles

