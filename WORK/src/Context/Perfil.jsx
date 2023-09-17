import React, { createContext, useState } from 'react'

export const Use = createContext()

const Perfil = ({children}) => {

    const [PeliBuscar, setPeliBuscar] = useState([])
    const [change, setChange] = useState()

    const vaciar = (e) => {
        e.preventDefault()
        setPeliBuscar([])
        setChange(null)
    }
    return (
        <Use.Provider value ={{PeliBuscar,setPeliBuscar,change, setChange,vaciar}}>
            {children}
        </Use.Provider>
    )
}

export default Perfil