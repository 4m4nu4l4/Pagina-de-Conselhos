import "./style-cadastro.css";
import wish from "../../assets/imgs/WishDaily.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import open from '../../assets/svg/open.svg'
import close from "../../assets/svg/close.svg"

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const validando = (email) => {
    return email.endsWith("@alunos.sc.senac.br");
  }
  const validando_senha = (senha) => {
    const validando = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return validando.test(senha);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseApi = await createUser({ nome, email, password });
      if (responseApi.id) {
        toast.success("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        setError("Ocorreu um erro inesperado, tente novamente.");
        toast.error("Erro ao realizar o cadastro, tente novamente.");
      }
    } catch (error) {
      if (error.status === 403) {
        toast.dark("Sem permissão.");
      } else if (error.status === 401 || error.status === 404) {
        toast.error('Email ou senha inválidos, tente novamente!');
      } else if (!email || !senha) {
        toast.error("Todos os campos devem ser preenchidos!");
      } else if (!validando(email)) {
        toast.info("O email deve ser do Senac.");
      } else if (!validando_senha(senha)) {
        toast.warning("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, símbolos e um número.");
      } else {
        toast.dark('Erro inesperado, tente novamente mais tarde!');
      }
    }
  };

  const toggleVisibility = () => {
    setShow(!show);
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
            <p className="camposCadastro">Informe o seu nome</p>
            <input
              type="text"
              id="nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o seu nome"
            />

            <p className="camposCadastro">Informe o seu e-mail</p>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o seu e-mail"
            />


            <p className="camposCadastro">Crie uma senha</p>
            <div id="password-container">
              <input
                type={show ? "text" : "password"}
                name=""
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="senha"
                placeholder="digite a senha"
              />
              <img src={show ? open : close} onClick={toggleVisibility} style={{ cursor: 'pointer' }} alt="" />
            </div>

            <button id="button-cadastro" type="submit">
              Cadastre-se
            </button>
            <p id="login-link">
              Se você já está cadastrado, não se preocupe! Você pode acessar sua
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
