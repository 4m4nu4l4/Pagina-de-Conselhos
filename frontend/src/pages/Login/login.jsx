import "./style-login.css"
import wish from "../../assets/imgs/WishDaily.png";
import { useContext } from "react";
import { AuthContext } from "../../auth/Context";
import { useNavigate } from "react-router-dom";

export default function Login () {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // const handleBackClick = () => {
  //   navigate('/')
  // }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        return toast('Informe o e-mail e a senha para continuar!');
    }

    try {
        // 7 - Usar Axios para fazer a requisição de login
        const response = await loginUser(email, password);
        if (response.token) {
            // 8 - Adicionar login ao AuthContext
            login(response.token);
            return navigate('/');
        }
    } catch (error) {
        if (error.response.status === 403) {
          return toast("Sem permissão.");
        }
        if (error.response.status === 401 || error.response.status === 404) {
          return toast('Email ou senha inválido, tente novamente!');
        }
        return toast('Erro inesperado, tente novamente mais tarde!');
    }
  };

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
            <input type="text" name="" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="digite o e-mail"/>
          </div>
          <div>
            <p className="campos">Informe a sua senha</p>
            <input type="text" name="" required value={senha} onChange={(e) => setSenha(e.target.value)} id="senha" placeholder="digite a senha"/>
          </div>
        </div>
        <button id="button-login" type="submit" onClick={handleSubmit}>Acesse a sua conta</button>
        {/* <p id="cadastro-text">Ainda não tem uma conta? Cadastre-se agora.</p> */}
    </div>
    </>
  
 )

}