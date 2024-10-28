import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './auth/Context';
// import Cadastrocomissao from "../../components/Cadastro-comissao"
import Bloquear from '../pages/Bloquear/Bloquear';

// Cria uma rota protegida que verifica se o usuário é admin
export function PrivateRoute({ children }) {
  const { token, role } = useContext(AuthContext);

  // Verifica se o usuário está logado e se é admin
  if (!token || role !== 'admin') {
    return <Navigate to="/login" />;
  }

  // Se for admin, renderiza o componente filho (rota protegida)
  return children ? children : <Bloquear />;
}