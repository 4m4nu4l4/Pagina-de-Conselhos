import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './auth/Context';
// import Cadastrocomissao from "../../components/Cadastro-comissao"
import Bloquear from '../pages/Bloquear/Bloquear';

export function PrivateRoute({ children }) {
  const { token, role } = useContext(AuthContext);
  if (!token || role !== 'admin') {
    return <Navigate to="/login" />;
  }
  return children ? children : <Bloquear />;
}