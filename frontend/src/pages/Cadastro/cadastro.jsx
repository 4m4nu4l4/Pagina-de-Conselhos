import "./style-cadastro.css";
import wish from "../../assets/imgs/WishDaily.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseApi = await createUser({ nome, email, password });
      console.log(responseApi);
      if (responseApi.id) {
        toast.success("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        setError("Ocorreu um erro inesperado, tente novamente.");
        toast.error("Erro ao realizar o cadastro, tente novamente.");
      }
    } catch (error) {
      console.log(error);
      if (error.status === 403) {
        toast.error("Sem permissão.");
      } else if (error.status === 401 || error.status === 404) {
        toast.error("Email ou senha inválidos, tente novamente!");
      } else {
        toast.error("Erro inesperado, tente novamente mais tarde!");
      }
    }
  };

  return (
    <div id="cadastro-container">
      <div id="cadastro">
        <div id="display-logo">
          <img src={wish} id="logo" alt="wish" />
          <p id="subtitle">
            Crie sua conta para aproveitar conselhos motivadores e orientações
            práticas todos os dias. Junte-se a nós e transforme o seu dia!
          </p>
        </div>
        <div id="line"></div>
        <div id="componentes">
          <form className="signup-form" onSubmit={handleSubmit}>
            <p className="campos">Informe o seu nome</p>
            <input
              type="text"
              id="nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o seu nome"
            />

            <p className="campos">Informe o seu e-mail</p>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o seu e-mail"
            />

            
              <p className="campos">Crie uma senha</p>
              <input
                type="password"
                id="senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a sua senha"
              />
              {error && <p>{error}</p>}
            
            <button id="button-cadastro" type="submit">
              Cadastre-se
            </button>
            <p id="login-link">
              Se você já está cadastrado, não se preocupe!Você pode acessar sua
              conta{" "}
              <Link to="/login" style={{ color: "#0081B8" }}>
                clicando aqui.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
