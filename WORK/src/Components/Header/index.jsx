import React, { useEffect, useState } from 'react'
import "./estilos.css"
import play from "./../../Assets/play.png"

const Header = () => {

    const [Obtener, setObtener] = useState([]);
    const [contador, setCount] = useState(0);
    const [Estado, setEstado] = useState(false)
    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";
    const activo = document.querySelector(".activo")

    const first = document.getElementById("0")
    const id = document.getElementById(contador.toString())

    const PeliculasHeader = async () => {
        let peliculas = [];

        let url = `${API}/movie/popular?api_key=${API_KEY}&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        for (let j = 0; j < 11; j++) {
            let imgPath = data.results[j].backdrop_path;

            if (imgPath) {
                let name = data.results[j].title;
                let id = data.results[j].id;
                let desc = data.results[j]. overview

                let img = `https://image.tmdb.org/t/p/original${imgPath}`; // Construye la URL completa de la imagen

                let info = {
                    name: name,
                    id: id,
                    img: img,
                    desc:desc
                };

                peliculas.push(info);
            }
        }

        setObtener([...Obtener, ...peliculas]);
    };

    useEffect(() => {
        PeliculasHeader();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const variable = e.target.id
        if (activo) {
            id?.classList?.remove("activo")
            e.target?.classList?.add("activo")
            setCount(Number(variable))
            setEstado(true)
        }
    };

    
    useEffect(() => {
        const element = document.querySelector(".fade-out");
        const element2 = document.querySelector(".fade-in");

        if(element){
            element?.classList?.remove("fade-out");
            element?.classList?.add("fade-in");
        }


        if(element2){
            element2?.classList?.remove("fade-in")
            element2?.classList?.add("fade-out")
        }
    }, [contador]);


    useEffect(() => {
        if (contador < 11) {
            setEstado(false)

            if (contador < 1) {
                first?.classList?.add("activo")
            }
            if (Estado === false) {
                id?.classList?.add("activo")
                activo?.classList?.remove("activo")

                setTimeout(() => {
                    setCount((prevCount) => prevCount + 1)
                }, 6000);

            } else {
                setEstado(false)
            }
        } else {
            setCount(0)
        }
    }, [contador])


    const Pelicula = Obtener[contador];
    return (
    <>
        <div
        className='fade-out'
            style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                height: "100vh",
                background: `linear-gradient(rgba(0,0,0, 0.50) 0%, rgba(0,0,0, 0.80) 100%), url(${Pelicula?.img}) center top / cover no-repeat`,
                scrollBehavior: "smooth"
            }}>

            <div className='DivName'>
                <h1>{Pelicula?.name}</h1>
                <p>{Pelicula?.desc}</p>
                <a><img src={play} alt="" /></a>
            </div>

            <div className="divBox">
                <div className="box activo" onClick={handleSubmit} id="0"></div>
                <div className="box" onClick={handleSubmit} id="1"></div>
                <div className="box" onClick={handleSubmit} id="2"></div>
                <div className="box" onClick={handleSubmit} id="3"></div>
                <div className="box" onClick={handleSubmit} id="4"></div>
                <div className="box" onClick={handleSubmit} id="5"></div>
                <div className="box" onClick={handleSubmit} id="6"></div>
                <div className="box" onClick={handleSubmit} id="7"></div>
                <div className="box" onClick={handleSubmit} id="8"></div>
                <div className="box" onClick={handleSubmit} id="9"></div>
                <div className="box" onClick={handleSubmit} id="10"></div>
            </div>
        </div>
        </>
    );

}

export default Header
