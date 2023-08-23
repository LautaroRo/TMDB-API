import React, { createContext, useState } from 'react'

export const Use = createContext()

const Perfil = ({children}) => {

    const [PeliBuscar, setPeliBuscar] = useState([])
    const [change, setChange] = useState()
    return (
        <Use.Provider value ={{PeliBuscar,setPeliBuscar,change, setChange}}>
            {children}
        </Use.Provider>
    )
}

export default Perfil