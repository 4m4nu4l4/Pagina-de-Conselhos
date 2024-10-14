import "./styles.css";
import React, { useEffect, useState } from "react";
import wish from "../../assets/imgs/wish.png";
import translate from 'translate';

export default function CardMensal() {
  const [conselhos, setConselhos] = useState([]);
  
  useEffect(() => {
    const fetchConselhos = async () => {
      const fetchedConselhos = new Set();
      const baseURL = "https://api.adviceslip.com/advice";
      const requests = [];
      
      // Criando múltiplas requisições
      for (let i = 0; i < 30; i++) {
        requests.push(fetch(baseURL).then(response => response.json()));
      }

      try {
        const results = await Promise.all(requests);
        results.forEach(result => {
          if (result && result.slip && result.slip.advice) {
            fetchedConselhos.add(result.slip.advice);
          } else {
            console.error("Estrutura da resposta inesperada:", result);
          }
        });

        // Garantindo que tenhamos 30 conselhos únicos
        while (fetchedConselhos.size < 30) {
          const additionalResults = await Promise.all(
            Array.from({ length: 30 - fetchedConselhos.size }, () =>
              fetch(baseURL).then(response => response.json())
            )
          );

          additionalResults.forEach(result => {
            if (result && result.slip && result.slip.advice) {
              fetchedConselhos.add(result.slip.advice);
            }
          });
        }

        // Convertendo o Set em Array e traduzindo os conselhos
        const translatedConselhos = await Promise.all(
          Array.from(fetchedConselhos).map(async (conselho) => {
            const traducao = await translate(conselho, { to: 'pt' });
            return traducao;
          })
        );

        setConselhos(translatedConselhos);
      } catch (error) {
        console.error("Erro ao buscar os conselhos:", error);
        setConselhos([]); // Resetando o estado dos conselhos em caso de erro
      }
    };

    fetchConselhos();
  }, []);

  return (
    <div id="container">
      <p id="title">
        Com 30 dias à sua frente, você tem 30 novas oportunidades de se tornar a melhor versão de si mesmo. Descubra o que a Wish Daily preparou para você neste mês!
      </p>
      <div id="cards-container">
        {conselhos.length > 0 ? (
          conselhos.map((conselho, index) => (
            <div className="card" key={index}>
              <img src={wish} className="card-image" alt="Ilustração de desejos" />
              <p className="title-notes">Dia {index + 1}</p>
              <p>{conselho}</p>
            </div>
          ))
        ) : (
          <p>Estamos preparando conselhos incríveis para você! Aguarde um momento...</p>
        )}
      </div>
    </div>
  );
}