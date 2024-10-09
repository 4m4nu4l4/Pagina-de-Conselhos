import { createContext, useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'

const isValidToken = (token) => {
    try {
        const decode = jwtDecode(token)
        console.log('Decodificando: ', decode)
        const currentTime = Date.now() / 1000
        return decode.exp > currentTime
    } catch (error) {
        return false
    }
}

const getRole = (token) => {
    try {
        const decode = jwtDecode(token)
        console.log('Decodificando: ', decode)
        return decode.role
    } catch (error) {
        return false
    }
}

export const AuthContext = createContext()

export const AuthProvider = () => {
    const { token, setToken } = useState(null)
    const { role, setRole } = useState(null)

    const login = (newToken) => {
        setToken(newToken)
        setRole(getRole) // função para pegar a role do token 
        localStorage.setItem('token', newToken)
    }
    const logout = () => {
        setToken(null)
        setRole(null) 
        localStorage.removeItem('token')
    }

    useEffect(() => {
        // validar o token -- evita que dê merda quando o usuário dá F5 na página
        const storage = localStorage.getItem('token')
        if (storage && isValidToken(storage)) {
            setToken(storage)
            setRole(getRole(storage))
        } else {
            // caso o token não seja válido
            setToken(null)
            setRole(null) 
            localStorage.removeItem('token')
        }
    }, [])

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
} 