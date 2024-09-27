import "./style-login.css"
import wish from "../../assets/imgs/WishDaily.png";

export default function Login () {
  return (  
    <>
    <div id="login">
        <div id="display-logo">
            <img src={wish} id="logo" alt="wish"/> 
            <p id="subtitle">Aproveite conselhos motivadores e orientações práticas sem complicações. Entre e inspire-se com dicas que podem transformar o seu dia.</p>
        </div>
    </div>
    </>
  
 )

}