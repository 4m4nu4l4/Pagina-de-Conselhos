import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/Context";
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'; 
import logoutIcon from "../../assets/svg/logout.svg"
import { toast } from "react-toastify";
=======
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/svg/logout.svg";
import profileIcon from "../../assets/imgs/user.png";
>>>>>>> 8660ff56d25d493a8e3c33a486043e5525dc59ff

export default function Header() {
  const { token, role, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
<<<<<<< HEAD
      toast.warning('Erro ao desconectar usuário!')
      console.log('Erro ao desconectar usuário -> ', e);
=======
      console.log("Erro ao desconectar usuário -> ", e);
>>>>>>> 8660ff56d25d493a8e3c33a486043e5525dc59ff
    }
  };

  const isLoginRoute = location.pathname === "/login";

  return (
    <>
      <div id="header">
        <div>
          {token && (
            <Link
              to="/sobre"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              <p id="title">Wish Daily</p>
            </Link>
          )}
        </div>
        <div id="header-pages">
          {token && (
            <Link
              to="/diario"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              <p id="cadastrar-regra">Diário</p>
            </Link>
          )}

          {token && (
            <Link
              to="/aleatorio"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              <p id="cadastrar-regra">Aleatório</p>
            </Link>
          )}

          {token && (
            <Link
              to="/mensal"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              <p id="cadastrar-regra">Semanal</p>
            </Link>
          )}

          {token && (
            <Link
              to="/conselho"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              <p id="cadastrar-regra">Deixe seu conselho</p>{" "}
            </Link>
          )}

          {!isLoginRoute && !token ? (
            <Link
              to="/login"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              {/* O link está vazio, talvez você queira adicionar um texto ou ícone aqui */}
            </Link>
          ) : null}

          {token && (
            <Link
              to="/sobre"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              <p id="cadastrar-regra">Sobre o projeto</p>
            </Link>
          )}

          {token && (
            <Link
              to="/perfil"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
            <img src={profileIcon}/>
            </Link>
          )}

          {token && role === "admin" && (
            <Link
              to="/bloquear"
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              <p id="cadastrar-regra">Gestão de Usuários</p>
            </Link>
          )}

          {token && (
            <Link
              onClick={handleLogout}
              className="menu-link"
              style={{ textDecoration: "none" }}
            >
              <img id="logout" src={logoutIcon} alt="" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
