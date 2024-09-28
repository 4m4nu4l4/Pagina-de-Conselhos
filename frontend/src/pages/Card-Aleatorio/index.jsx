import React, { useState, useEffect } from "react";
import "./styles.css";

import carrinho from "../../assets/imgs/carrinho.png"

export default function CardAleatorio() {
  const [frase, setFrase] = useState("");

  const buscarFrase = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice"); 
      const data = await response.json();
      setFrase(data.slip.advice); 
    } catch (error) {
      console.error("Erro ao buscar a frase", error);
    }
  };
  
  useEffect(() => {
    buscarFrase();
  }, []);

  return (
    <div id="display-aleatorio">
      <div id="img">
        <img src={carrinho} alt="" />
      </div>
      <div className="card">
        <h1>Frase Aleatória</h1>
        <p>{frase}</p>
        <button onClick={buscarFrase}>Gerar Nova Frase</button>
      </div>
    </div>
  );
}
