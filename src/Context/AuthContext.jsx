import {  createContext, useState } from "react"
export const AuthProvider = createContext('light')

export default function AuthContext({ children }) {

const [token, settoken] = useState(localStorage.getItem("Token"))

    return (


        <AuthProvider.Provider value={ {token ,settoken} } >

            {children}

        </AuthProvider.Provider>



    )
}
