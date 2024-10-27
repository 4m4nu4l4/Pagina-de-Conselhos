import "./style-login.css";
import wish from "../../assets/imgs/WishDaily.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/Context";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/user";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast("Informe o e-mail e a senha para continuar!");
    }

    try {
      const response = await loginUser(email, password);
      if (response.token) {
        login(response.token);
        return navigate("/sobre");
      } else {
        setError("Erro ao fazer login, tente novamente.");
        toast.error("Erro ao fazer login, tente novamente.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Sem permissão.");
      } else if (
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        toast.error("Email ou senha inválido, tente novamente!");
      } else {
        toast.error("Erro inesperado, tente novamente mais tarde!");
      }
    }
  };

  return (
    <div id="login-container">
    
      <div id="login">
        <div id="display-logo">
          <img src={wish} id="logo" alt="wish" />
          <p id="subtitle">
            {" "}
            Aproveite conselhos motivadores e orientações práticas sem
            complicações. Entre e inspire-se com dicas que podem transformar o
            seu dia.
          </p>
        </div>
        <div id="line"></div>
        <div id="componentes">
          <p className="campos">Informe o seu e-mail</p>
          <input
            type="text"
            name=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="digite o e-mail"
          />

          <p className="campos">Informe a sua senha</p>
          <input
            type="text"
            name=""
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="senha"
            placeholder="digite a senha"
          />

          <button id="button-login" type="submit" onClick={handleSubmit}>
            Acesse a sua conta
          </button>
          <p id="cadastro-link">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" style={{ color: "#0081B8" }}>
              Cadastre-se agora.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
