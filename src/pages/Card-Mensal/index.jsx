import React, { useEffect, useState } from "react";
import "./styles.css";

export default function CardMensal() {
  const [conselhos, setConselhos] = useState([]);
  useEffect(() => {
    const fetchConselhos = async () => {
      const fetchedConselhos = [];
      const baseURL = "https://api.adviceslip.com/advice";
      while (fetchedConselhos.length < 30) {
        try {
          const response = await fetch(baseURL);
          const data = await response.json();
          const conselho = data.slip.advice;
          if (!fetchedConselhos.includes(conselho)) {
            fetchedConselhos.push(conselho);
          }
        } catch (error) {
          console.error("Erro ao buscar os conselhos:", error);
          break; 
        }
      }
      setConselhos(fetchedConselhos);
    };
    fetchConselhos();
  }, []);

  return (
    <div id="container">
      <p id="title">Com 30 dias à sua frente, você tem 30 novas oportunidades de se tornar a melhor versão de si mesmo. Descubra o que a Wish Daily preparou para você neste mês!</p>
      <div id="cards-container">
        {conselhos.length > 0 ? (
          conselhos.map((conselho, index) => (
            <div id="card" key={index}>
              <p id="title-notes">Dia {index + 1}</p>
              <p>{conselho}</p>
            </div>
          ))
        ) : (
          <p>Estamos em busca de informações para você!</p>
        )}
      </div>
    </div>
  );
}
