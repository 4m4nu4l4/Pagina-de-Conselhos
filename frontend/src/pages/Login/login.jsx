import "./style-login.css"
import wish from "../../assets/imgs/WishDaily.png";

export default function Login () {
  return (  
    <>
    <div id="login">
        <div id="display-logo">
            <img src={wish} id="logo" alt="wish"/> 
            <p id="subtitle"> Aproveite conselhos motivadores e orientações práticas sem complicações. Entre e inspire-se com dicas que podem transformar o seu dia.</p>
        </div>
        <div id="line"></div>
        <div id="componentes">
          <div>
            <p className="campos">Informe o seu e-mail</p>
            <input type="text" name="" id="email" placeholder="digite o e-mail"/>
          </div>
          <div>
            <p className="campos">Informe a sua senha</p>
            <input type="text" name="" id="senha" placeholder="digite a senha"/>
          </div>
        </div>
        <button id="button-login">Acesse a sua conta</button>
        {/* <p id="cadastro-text">Ainda não tem uma conta? Cadastre-se agora.</p> */}
    </div>
    </>
  
 )

}