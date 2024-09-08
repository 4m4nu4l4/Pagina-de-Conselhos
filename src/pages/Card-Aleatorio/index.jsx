import React, { useState, useEffect } from "react";
import "./styles.css";

// Função que retorna o componente CardAleatorio
export default function CardAleatorio() {
  // Estado para armazenar a frase aleatória
  const [frase, setFrase] = useState("");

  // Função para buscar a frase da API
  const buscarFrase = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice"); // Exemplo de API que retorna conselhos
      const data = await response.json();
      setFrase(data.slip.advice); // Atualiza o estado com a frase recebida
    } catch (error) {
      console.error("Erro ao buscar a frase", error);
    }
  };

  // Hook para buscar uma frase aleatória ao carregar a página
  useEffect(() => {
    buscarFrase();
  }, []);

  return (
    <div className="card">
      <h1>Frase Aleatória</h1>
      <p>{frase}</p>
      <button onClick={buscarFrase}>Gerar Nova Frase</button>
    </div>
  );
}
