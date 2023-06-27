import React, { useContext, useEffect, useState, } from 'react'
import "./estilos.css"
import { NavLink, useParams } from 'react-router-dom'
import foto1 from "./../../Assets/foto1.jpeg"
import foto2 from "./../../Assets/foto2.jpeg"
import foto3 from "./../../Assets/foto3.jpeg"
import foto4 from "./../../Assets/foto4.jpeg"
import foto5 from "./../../Assets/foto5.jpeg"
import foto6 from "./../../Assets/foto6.jpeg"
import foto7 from "./../../Assets/foto7.jpeg"
import foto8 from "./../../Assets/foto8.jpeg"
import foto9 from "./../../Assets/foto9.jpeg"
import foto10 from "./../../Assets/foto10.jpeg"
import foto11 from "./../../Assets/foto11.jpeg"
import foto12 from "./../../Assets/foto12.jpeg"
import { ProfileCreation } from '../../Context/Profile'
import { guardarLocal } from '../Helper'
const Inicio = () => {

    const { profile, setProfile} = useContext(ProfileCreation)


    const [Estado, setEstado] = useState(0)
    const [fotos, setFotos] = useState([])
    const [cont, setCont] = useState(0)
    const [ProfileCreate, setProfileCreate] = useState(false)
    const [IniciarSesion, setIniciarSesion] = useState(false)
    const [nameInicio, setNameInicio] = useState()
    const { name } = useParams()

    const iniciarSesion = (e) => {
        e.preventDefault()
        const perfileExistenteBorrar = localStorage.getItem("nombres")
        if(perfileExistenteBorrar){
            localStorage.removeItem("nombres")
        }else{
            console.log("no habia")
        }
        const nombre = e.target.username.value
        guardarLocal("nombres",nombre)
        const contra = e.target.password.value


        const nombreGuardado = JSON.parse(localStorage.getItem(` Ruta${nombre}`))
        if(nombreGuardado){
            const perfileExistente = nombreGuardado?.filter((element) => element.name === nombre && element.password === contra)
            if (perfileExistente && perfileExistente.length > 0) {
                setNameInicio(perfileExistente[0]?.name)
                setIniciarSesion(true)
                console.log(perfileExistente)
                console.log("si existe")
            } else {
                setIniciarSesion(false)
                console.log("no existe")
                console.log(perfileExistente)
    
            }
        }else{
            console.log("errir")
        }

    }

    const crearPerfil = (e) => {
        e.preventDefault()

        const nombre = e.target.user.value
        const password = e.target.pas.value
        const email = e.target.email.value
        let info = {
            name: nombre,
            password: password,
            email: email
        }

        setProfile(info)
        let nombreNull = e.target.user
        let passwordNull = e.target.pas
        let emailNull = e.target.email

        nombreNull.value = ""
        passwordNull.value = ""
        emailNull.value = ""



        const nombreGuardado = JSON.parse(localStorage.getItem(nombre)) || []
        const perfileExistente = nombreGuardado.filter((element) => element.name === nombre)
        const emailExistente = JSON.parse(localStorage.getItem("emails"))

        
        if (perfileExistente.length > 0 || emailExistente?.includes(email)) {
            console.log("god")
        } else {
            console.log("error")
            guardarLocal(` Ruta${nombre}` , info)
            setProfileCreate(true)
            guardarLocal("emails", email)
        }
    }
    useEffect(() => {
        setFotos([
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
            foto12
        ]);



    }, []);
    const contador = fotos[cont]
    useEffect(() => {

        setTimeout(() => {
            if (Estado === 2 && cont < 11) {
                setCont((prevCount) => prevCount + 1);
            }
            else {
                setCont(0)
            }
        }, 4000);
    }, [cont, Estado]);

    return (
        <div>
            {
                Estado === 0
                    ?
                    <div className='Inicio'>
                        <div className="IniciarSecion">
                            <h1>Bienvenido a Pelis</h1>
                            <div className="Btons">
                                <button className='IniciarSesion' onClick={() => setEstado(1)}>Iniciar Sesion</button>
                                <button className="Registrarse" onClick={() => setEstado(2)}>Registar</button>
                            </div>
                        </div>

                        <div className="fondo">

                        </div>
                    </div>

                    :
                    null
            }

            {
                Estado === 1

                    ?
                    <div className='divIniciarSesion'>
                        <div className='insideDivIniciar'>
                            {
                                IniciarSesion === false

                                    ?
                                    <>
                                        <h2>Iniciar sesion</h2>
                                        <form onSubmit={iniciarSesion}>
                                            <div className='username'>
                                                <input name='username'></input>
                                                <label>Nombre del usuario</label>
                                            </div>
                                            <div className="lastname">
                                                <input name='password' type='password'></input>
                                                <label>Contraseña</label>
                                            </div>
                                            <div className="opcionContraseña">
                                                <span>Olvidaste tu contraseña??</span>
                                            </div>
                                            <div className="opcionRegistrarte">
                                                <span onClick={() => setEstado(2)}>Registarte aqui</span>
                                            </div>
                                            <div className="posicionBton">
                                                <button type='submit' className="button">Iniciar</button>
                                            </div>
                                        </form>
                                    </>
                                    :
                                    <NavLink to={`/ruta/${nameInicio}`} className="irAPerfiles" type="submit">Iniciar</NavLink>

                            }
                        </div>
                    </div>
                    :
                    null
            }
            {
                Estado === 2

                    ?
                    <div className="registrarteContainer"
                        style={{
                            background: `linear-gradient(rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.70) 100%), url(${contador}) center center/ cover no-repeat`,
                            height: "100vh",
                            widht: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <div className="containerformRegis">
                            {
                                ProfileCreate === true

                                    ?
                                    <div>
                                        <h3>Bienvenido {profile.name}</h3>
                                        <NavLink to={`/ruta/${profile?.name}`} className="irAPerfiles" type="submit">Registrate</NavLink>
                                    </div>
                                    :
                                    <>
                                        <h2>Registate</h2>
                                        <form onSubmit={crearPerfil}>
                                            <div className="IngresarUser">
                                                <input name='user' required type='text' />
                                                <label>Ingresa tu nombre</label>
                                            </div>

                                            <div className="ingresarContra">
                                                <input name='pas' required type='password' />
                                                <label>Ingresa tu contraseña</label>
                                            </div>

                                            <div className="email">
                                                <input name='email' required type="email" />
                                                <label>Ingresa tu Email</label>
                                            </div>
                                            <button className="irAPerfiles" type="submit">Registrate</button>
                                        </form>
                                    </>
                            }
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Inicio