import "./style-cadastro.css";
import wish from "../../assets/imgs/WishDaily.png";

export default function Cadastro() {
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
            <input type="text" id="nome" placeholder="Digite o seu nome" />
          </div>
          <div>
            <p className="campos">Informe o seu e-mail</p>
            <input type="email" id="email" placeholder="Digite o seu e-mail" />
          </div>
          <div>
            <p className="campos">Crie uma senha</p>
            <input type="password" id="senha" placeholder="Digite a sua senha" />
          </div>
          <div>
            <p className="campos">Confirme a sua senha</p>
            <input type="password" id="confirma-senha" placeholder="Confirme a sua senha" />
          </div>
        </div>
        <button id="button-cadastro">Cadastre-se</button>
      </div>
    </>
  );
}
