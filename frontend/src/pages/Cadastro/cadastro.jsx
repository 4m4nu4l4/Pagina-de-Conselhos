import "./style-cadastro.css";
import wish from "../../assets/imgs/WishDaily.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/user";
import { toast } from 'react-toastify';

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const responseApi = await createUser({nome, email, password})
      console.log(responseApi)
      if(responseApi.id) {
        navigate('/login')
      } else { 
        console.log(responseApi)
      }
    } catch (error) {
      console.log(error)
      if (error.status === 403) {
        return toast('Sem permissão');
      }
      if (error.status === 401 || error.status === 404) {
        return toast('Email ou senha são inválidos, tente novamente!');
      }
      toast('Erro inesperado, tente novamente mais tarde!');
    }
  };

  return (
    <>
      <div id="cadastro">
        <div id="display-logo">
          <img src={wish} id="logo" alt="wish" />
          <p id="subtitle">
            Crie sua conta para aproveitar conselhos motivadores e orientações práticas todos os dias. Junte-se a nós e transforme o seu dia!
          </p>
        </div>
        <div id="line"></div>
        <div id="componentes">
          <div>
            <p className="campos">Informe o seu nome</p>
            <input type="text" id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o seu nome" />
          </div>
          <div>
            <p className="campos">Informe o seu e-mail</p>
            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o seu e-mail" />
          </div>
          <div>
            <p className="campos">Crie uma senha</p>
            <input type="password" id="senha" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a sua senha" />
          </div>
        </div>
        <button id="button-cadastro">Cadastre-se</button>
      </div>
    </>
  );
}
