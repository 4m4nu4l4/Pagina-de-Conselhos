import "./styles.css";
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';

export default function Header() {

  const { token, role } = useContext(AuthContext);
  const location = useLocation();

  const isLoginRoute = location.pathname === '/login';

  return (
    <>
      <div id="header">
        <div>
        {
          token &&<Link to="/login" className="menu-link" style={{textDecoration: 'none'}}><p id="title">Wish Daily</p></Link>
        }
        </div>
        <div id="header-pages">
        <div>
            {
              token &&<Link to="/" className="menu-link" style={{textDecoration: 'none'}}><p id="cadastrar-regra">Diário</p></Link>
            }
          </div>

          {/* <Link to="/categoria">
            <p  className="pages">Categoria</p>
          </Link> */}

          <div>
            {
              
              token && <Link to="/conselho" className="menu-link" style={{textDecoration: 'none'}}><p id="cadastrar-regra">Aleatório</p></Link>
            }
          </div>

          <div>
            {
              token && <Link to="/conselho" className="menu-link" style={{textDecoration: 'none'}}><p id="cadastrar-regra">Mensal</p></Link>
            }
          </div>

          <div>
            {
              !isLoginRoute && !token
                ? <Link to="/conselho" className="menu-link" style={{textDecoration: 'none'}}><p id="cadastrar-regra">Deixe seu conselho</p> </Link>
                : null
            }
          </div>

          <div>
            {
              !isLoginRoute && !token
                ? <Link to="/login" className="menu-link" style={{textDecoration: 'none'}}></Link>
                : null
            }
          </div>

          <div>
            {
              token && <Link to="/sobre" className="menu-link" style={{textDecoration: 'none'}}> <p id="cadastrar-regra">Sobre o projeto</p> </Link>
            }
          </div>
        </div>
      </div>
    </>
  );
}
