import { useContext } from "react"
import { AuthContext } from "../auth/Context"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const token = useContext(AuthContext) // pegar o token
    if (token === null) {
        return <Navigate to='/login' /> // verificar se é nulo
    }
    return <Outlet /> // redirecionamento se não for nulo
}

export default PrivateRoute