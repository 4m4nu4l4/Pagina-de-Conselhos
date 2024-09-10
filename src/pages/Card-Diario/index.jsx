import React, { useEffect, useState } from "react";
import "./styles.css";
import wish from "../../assets/imgs/wish.png";
 
export default function CardDiario() {
  const [conselho, setConselho] = useState("");
  const [dataAtual, setDataAtual] = useState("");
  
  useEffect(() => {
    const fetchConselho = async () => {
      try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        setConselho(data.slip.advice);
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
    </div>
  );
}