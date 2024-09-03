import "./styles.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div id="header">
        <div>
          <Link to="/">
            <p id="title">Consumindo Api de Conselhos </p>
          </Link>
        </div>
        <div id="header-pages">
          <Link to="/">
            <p>Diário</p>
          </Link>

          <Link to="/categoria">
            <p>Categoria</p>
          </Link>

          <Link to="/aleatorio">
            <p>Aleatório</p>
          </Link>

          <Link to="/mensal">
            <p>Mensal</p>
          </Link>

          <Link to="/conselho">
            <p>Deixe seu conselho</p>
          </Link>

          <Link to="/sobre">
            <p>Sobre</p>
          </Link>
        </div>
      </div>
    </>
  );
}
