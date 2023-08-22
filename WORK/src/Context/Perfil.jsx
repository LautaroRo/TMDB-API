import React, { createContext, useState } from 'react'

export const Use = createContext()

const Perfil = ({children}) => {

    const [PeliBuscar, setPeliBuscar] = useState([])
    return (
        <Use.Provider value ={{PeliBuscar,setPeliBuscar}}>
            {children}
        </Use.Provider>
    )
}

export default Perfil