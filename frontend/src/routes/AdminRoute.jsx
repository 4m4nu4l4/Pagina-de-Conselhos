import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './auth/Context';

// Cria uma rota protegida que verifica se o usuário é admin
export function PrivateRoute({ component: Component, ...rest }) {
  const { token, role } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        token && role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/not-authorized" />
        )
      }
    />
  );
}