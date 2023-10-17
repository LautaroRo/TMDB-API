import React, { useEffect, useState, } from 'react'
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
import netflix from "./../../Assets/netflix.png"
import { guardarLocal } from '../Helper'


const Inicio = () => {


    const [Estado, setEstado] = useState(0)
    const [fotos, setFotos] = useState([])
    const [cont, setCont] = useState(0)
    const [ProfileCreate, setProfileCreate] = useState(false)
    const [IniciarSesion, setIniciarSesion] = useState(false)
    const [nameInicio, setNameInicio] = useState()
    const [profile, setProfile] = useState([])
    const [pelisBuscadas, setPeliBuscadas] = useState([])
    const { name } = useParams()

    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";
    const iniciarSesion = (e) => {
        e.preventDefault()

        const perfileExistenteBorrar = localStorage.getItem("nombres")
        if (perfileExistenteBorrar) {
            localStorage.removeItem("nombres")
        } else {
            console.log("no habia")
        }
        const nombre = e.target.username.value
        guardarLocal("nombres", nombre)
        const contra = e.target.password.value

        const nombreGuardado = JSON.parse(localStorage.getItem(` Ruta${nombre}`))
        if (nombreGuardado) {
            const perfileExistente = nombreGuardado?.filter((element) => element.name === nombre && element.password === contra)
            if (perfileExistente && perfileExistente.length > 0) {
                setNameInicio(perfileExistente[0]?.name)
                setIniciarSesion(true)
            } else {
                setIniciarSesion(false)

            }
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



        const nombreGuardado = JSON.parse(localStorage.getItem(` Ruta${nombre}`)) || []


        if (nombreGuardado?.length > 0 || nombreGuardado[0]?.email === email || nombreGuardado[0]?.nombre) {
            console.log("god")
        } else {
            console.log("error")
            guardarLocal(` Ruta${nombre}`, info)
            setProfileCreate(true)
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
        const element = document.querySelector(".registrarteContainer");
        const element2 = document.querySelector(".registrarteContainer-in");

        if (element) {
            element?.classList?.remove("registrarteContainer");
            element?.classList?.add("registrarteContainer-in");
        }


        if (element2) {
            element2?.classList?.remove("registrarteContainer-in")
            element2?.classList?.add("registrarteContainer")
        }
    }, [contador]);
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
    const buscar = async (e) => {
        e.preventDefault()

        const url = `${API}/search/movie?api_key=${API_KEY}&query=${e.target.value}`;
        const response = await fetch(url);
        const data = await response.json();
        let informacion = []
        if(data?.results){
            for (let i = 0; i < 6; i++) {
                if (data?.results[i]  && data.results[i]?.poster_path !== undefined && data.results[i]?.poster_path !== null) {
                    let info = {
                        name: data?.results[i]?.title,
                        id: data?.results[i]?.id,
                        tipo: "Pelicula",
                    }
                    informacion.push(info)
                }
            }
            setPeliBuscadas(informacion)
        }

        const urlSerie = `${API}/search/tv?api_key=${API_KEY}&query=${e.target.value}`;
        const responseSerie = await fetch(urlSerie);
        const dataSerie = await responseSerie.json();
        if(dataSerie?.results){

        
        for (let i = 0; i < 6; i++) {
            if (data.results[i] && data.results[i]?.poster_path !== undefined && data.results[i]?.poster_path !== null && data.results[i].original_language){
                let info = {
                    name: dataSerie?.results[i]?.name,
                    id: dataSerie?.results[i]?.id,
                    tipo: "Series",
                }
                informacion.push(info)
            }
        }
    }
    setPeliBuscadas(informacion)
    console.log(informacion)
    }

    const cambiarClase = (e) => {
        e.preventDefault()
        const ubicacionNombre = document.querySelector(".nombrelabel")
        const ubicacionPasswrod = document.querySelector(".contra")
        if (ubicacionNombre && ubicacionPasswrod) {
            if (e.target.id === "inputContraseña") {
                ubicacionPasswrod?.classList?.add("ActivoLabel")
                ubicacionPasswrod?.classList?.remove("label")
                console.log(ubicacionPasswrod)
            } else if (e.target.id === "inputNombre") {
                ubicacionNombre?.classList?.add("ActivoLabel")
                ubicacionNombre?.classList?.remove("label")
            }



            if (e?.target?.name === "username") {
                if (e?.target?.value.length < 1) {
                    ubicacionNombre?.classList?.remove("ActivoLabel")
                    ubicacionNombre?.classList?.add("label")
                }
            } else if (e?.target?.name === "password") {
                if (e?.target?.value.length < 1) {
                    ubicacionPasswrod?.classList?.remove("ActivoLabel")
                    ubicacionPasswrod?.classList?.add("label")
                }
            }
        }
    }
    return (
        <div>
            <nav className='navLogo'>
                <img src={netflix}></img>

                {
                    Estado === 1

                    ?
                    null
                    :
                    <button className='IniciarSesion' onClick={() => setEstado(1)}>Iniciar Sesion</button>
                }

            </nav>
            {
                Estado === 0
                    ?
                    <div className='Inicio'>
                        <div className="IniciarSecion">
                            <h2>Las mejores Peliculas,Series</h2>
                            <h3>Shows, Documentales</h3>
                            <p>La mejor pagina de streaming donde encontraras tus peliculas favoritas</p>
                            <div className="Btons">
                                <input placeholder='Busca tus peliculas favoritas y descubre si estan en nuestra plaforma' onChange={buscar} className='buscadorInicial' type="text" /><button className="Registrarse" onClick={() => setEstado(2)}>Registrarse</button>
                            </div>
                            <div className='Filtradas'>
                            {
                                pelisBuscadas?.length > 0
                                    ?
                                    <>
                                        {pelisBuscadas.map((pelis) => {
                                            return (
                                                <div className='DivPelisFiltradas'>
                                                    <p>{pelis.name}</p>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :
                                    null
                            }
                            </div>
                        </div>
                    </div>

                    :
                    null
            }

            {
                Estado === 1

                    ?
                    <div className='divIniciarSesion'>
                        <div className='divIniciarSesionunder'>
                            {
                                IniciarSesion === false

                                    ?
                                    <div className='insideDivIniciar'>
                                        <h2>Iniciar sesion</h2>
                                        <form onSubmit={iniciarSesion}>
                                            <div className='username'>
                                                <input onChange={cambiarClase} id='inputNombre' name='username'></input>
                                                <label className='label nombrelabel' id="nombreLabel">Nombre del usuario</label>
                                            </div>
                                            <div className="lastname">
                                                <input onChange={cambiarClase} id='inputContraseña' name='password' type='password'></input>
                                                <label className='label contra' id="contraseñaLabel">Contraseña</label>
                                            </div>
                                            <div className="opcionContraseña">
                                                <span className='span1'>Olvidaste tu contraseña??</span>
                                                <span className='span2' onClick={() => setEstado(2)}>Registarte aqui</span>
                                            </div>
                                            <div className="posicionBton">
                                                <button type='submit' className="button">Iniciar</button>
                                            </div>
                                        </form>
                                    </div>
                                    :
                                    <>
                                        <div className="containerCarga">
                                            <div className='one'></div>
                                            <div className='two'></div>
                                            <div className='third'></div>
                                        </div>
                                        <NavLink to={`/ruta/${nameInicio}`} className="irAPerfilesFirst" type="submit">Iniciar</NavLink>
                                    </>

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
                                            <span onClick={() => setEstado(1)}>Ya tienes una cuenta? Inicia sesion</span>
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