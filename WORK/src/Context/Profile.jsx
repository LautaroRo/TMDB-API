import React, { createContext, useState } from 'react'

export const ProfileCreation = createContext()

const Profile = ({children}) => {

    const [profile, setProfile] = useState([])

    return (
        <ProfileCreation.Provider value ={{setProfile,profile}}>
            {children}
        </ProfileCreation.Provider>
    )
}

export default Profile