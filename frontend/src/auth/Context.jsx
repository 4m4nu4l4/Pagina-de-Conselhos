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

export const AuthProvider = ({children}) => {
    const [ token, setToken ]   = useState(null)
    const [ role, setRole ] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && isValidToken(storedToken)) {
          setToken(storedToken);
          setRole(getRole(storedToken));
        } else {
          setToken(null);
          setRole(null);
          localStorage.removeItem('token');
        }
        setLoading(false);
    }, []);

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
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, role }}>
        {children}
        </AuthContext.Provider>
    )
} 