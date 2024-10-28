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

const getUserId = (token) => {
    try {
        const decoded = jwtDecode(token);
        return { userId: decoded.id, role: decoded.role };
    } catch (error) {
        return { userId: null, role: null };
    }
};

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
    const [ token, setToken ]   = useState(null);
    const [ role, setRole ] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && isValidToken(storedToken)) {
          setToken(storedToken);
          setRole(getRole(storedToken));
          const { userId } = getUserId(storedToken);
          setUserId(userId);
        } else {
          setToken(null);
          setUserId(null);
          setRole(null);
          localStorage.removeItem('token');
        }
        setLoading(false);
    }, []);

    const login = (newToken) => {
        setToken(newToken)
        const { userId } = getUserId(newToken);
        setUserId(userId);
        setRole(getRole(newToken)) // função para pegar a role do token 
        localStorage.setItem('token', newToken)
    }
    const logout = () => {
        setToken(null)
        setUserId(null);
        setRole(null) 
        localStorage.removeItem('token')
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, role, userId }}>
        {children}
        </AuthContext.Provider>
    )
} 