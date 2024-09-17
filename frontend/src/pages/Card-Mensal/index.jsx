import "./styles.css";
import React, { useEffect, useState } from "react";
import wish from "../../assets/imgs/wish.png";

export default function CardMensal() {
  const [conselhos, setConselhos] = useState([]);
  useEffect(() => {
    const fetchConselhos = async () => {
      const fetchedConselhos = new Set();
      const baseURL = "https://api.adviceslip.com/advice";
      const requests = [];
      for (let i = 0; i < 30; i++) {
        requests.push(fetch(baseURL).then(response => response.json()));
      }
      try {
        const results = await Promise.all(requests);
        results.forEach(result => {
          if (result && result.slip && result.slip.advice) {
            const conselho = result.slip.advice;
            fetchedConselhos.add(conselho);
          } else {
            console.error("Estrutura da resposta inesperada:", result);
          }
        });
        const uniqueConselhos = Array.from(fetchedConselhos);
        while (uniqueConselhos.length < 30) {
          const additionalResults = await Promise.all(
            Array.from({ length: 30 - uniqueConselhos.length }, () => fetch(baseURL).then(response => response.json()))
          );
          additionalResults.forEach(result => {
            if (result && result.slip && result.slip.advice) {
              const conselho = result.slip.advice;
              if (!uniqueConselhos.includes(conselho)) {
                uniqueConselhos.push(conselho);
              }
            }
          });
        }
        console.log(uniqueConselhos); 
        setConselhos(uniqueConselhos);
      } catch (error) {
        console.error("Erro ao buscar os conselhos:", error);
      }
    };
    fetchConselhos();
  }, []);

  return (
    <div id="container">
      <p id="title">Com 30 dias à sua frente, você tem 30 novas oportunidades de se tornar a melhor versão de si mesmo. Descubra o que a Wish Daily preparou para você neste mês!</p>
      <div id="cards-container">
        {conselhos.length > 0 ? (
          conselhos.map((conselho, index) => (
            <div className="card" key={index}>
              <img src={wish} className="card-image" alt="wish"/>
              <p className="title-notes">Dia {index + 1}</p>
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
