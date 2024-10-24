import React, { useEffect, useState } from "react";
import "./styles.css";
import translate from 'translate';
import wish from "../../assets/imgs/wish.png";
import img01 from "../../assets/random-img/card-inicial/verde.jpg"
import img02 from "../../assets/random-img/card-inicial/green.jpg"
import img03 from "../../assets/random-img/card-inicial/arvore.jpg"
import img04 from "../../assets/random-img/card-inicial/aguia.jpg"
// import img05 from "../../assets/random-img/card-inicial/arvore.jpg"
import img05 from "../../assets/random-img/card-inicial/balloons.jpg"
import img06 from "../../assets/random-img/card-inicial/hands.jpg"
import img07 from "../../assets/random-img/card-inicial/lake.jpg"
import img08 from "../../assets/random-img/card-inicial/sunset.jpg"
import img09 from "../../assets/random-img/card-inicial/woman.jpg"

const random_img = [
  img01,
  img02, 
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09
]

export default function CardDiario() {
  const [conselho, setConselho] = useState("");
  const [dataAtual, setDataAtual] = useState("");
  const [imagensAtuais, setImagensAtuais] = useState([]);
  
  useEffect(() => {
    const selecionarImagens = () => {
      const imagensAleatorias = Array(4) 
        .fill()
        .map(() => {
          const indice = Math.floor(Math.random() * random_img.length);
          return random_img[indice];
        });
      setImagensAtuais(imagensAleatorias);
    };
    selecionarImagens();
    const fetchConselho = async () => {
      try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        
        // Verifique se o campo 'slip' existe antes de acessar 'advice'
        if (data.slip && data.slip.advice) {
          const traduzido = await translate(data.slip.advice, 'pt');
          setConselho(traduzido);
        } else {
          throw new Error("Formato inesperado de resposta da API");
        }
      } catch (error) {
        console.error("Erro ao buscar o conselho:", error);
      }
    };
    
    fetchConselho();    
    
    const data = new Date();
    const dataFormatada = data.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDataAtual(dataFormatada);
  }, []);
  
  return (
    <div className="introducao">
      
      <b>
        Bem-vindo(a)! Todos os dias, você encontrará aqui uma mensagem especial
        para inspirar e motivar o seu dia. Aproveite a mensagem de hoje:
      </b>
      <div className="card"> 
      <img src={wish} className="card-image" alt="wish"/> 
        <strong>
          <p className="data">{dataAtual}</p>
        </strong>
        <h2>Conselho do Dia</h2>
        <p>{conselho ? conselho : "Carregando conselho..."}</p>
      </div>
      <div id="display-imgs">
        {imagensAtuais.map((img, index) => (
          <img
            key={index}
            src={img}
            style={{ width: 'auto', height: '200px', borderRadius: '15px' }}
            alt={`imagem-${index}`}
          />
        ))}
      </div>
    </div>
  );
}