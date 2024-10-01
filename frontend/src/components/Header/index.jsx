import "./styles.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div id="header">
        <div>
          <Link to="/sobre">
            <p id="title">WishDaily </p>
          </Link>
        </div>
        <div id="header-pages">
          <Link to="/">
            <p className="pages">Diário</p>
          </Link>

          {/* <Link to="/categoria">
            <p  className="pages">Categoria</p>
          </Link> */}

          <Link to="/aleatorio">
            <p  className="pages">Aleatório</p>
          </Link>

          <Link to="/mensal">
            <p  className="pages">Mensal</p>
          </Link>

          <Link to="/conselho">
            <p  className="pages">Deixe seu conselho</p>
          </Link>

          <Link to="/login">
            <p  className="pages">Login</p>
          </Link>

          <Link to="/cadastro">
            <p  className="pages">Cadastro</p>
          </Link>

          {/* <Link to="/sobre">
            <p  className="pages">Sobre</p>
          </Link> */}
        </div>
      </div>
    </>
  );
}
