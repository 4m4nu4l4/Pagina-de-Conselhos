import React, { useState, useEffect } from "react";
import "./styles.css";
// import translate from 'translate';
import carrinho from "../../assets/imgs/carrinho.png"
import { toast } from "react-toastify";
import { getOneAdvice } from "../../api/advice";

export default function CardAleatorio() {
  // const [frase, setFrase] = useState("");
  const [advice, setAdvice] = useState([])
  const [loading, setLoading] = useState(false)

  const getOneAdvice = async () => {
    setLoading(true)
    try {
      const data = await getOneAdvice();
      if (!data) {
        throw new Error('Erro ao buscar conselho');
      }
      setAdvice(data)
      toast.success('Conselho aleatório carregado com sucesso!')
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao carregar os conselhos. Tente novamente!");
    } finally {
      setLoading(false);
    }
  }

  // const buscarFrase = async () => {
  //   try {
  //     const response = await fetch("https://api.adviceslip.com/advice"); 
  //     const data = await response.json();
  //     // setFrase(data.slip.advice); 
  //     if (data.slip && data.slip.advice) {
  //       const traduzido = await translate(data.slip.advice, 'pt');
  //       setFrase(traduzido);
  //     } else {
  //       throw new Error("Formato inesperado de resposta da API");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao buscar a frase", error);
  //   }
  // };
  
  useEffect(() => {
    getOneAdvice();
  }, []);

  return (
    <div id="display-aleatorio">
      <div id="img">
        <img src={carrinho} alt="" />
      </div>
      <div className="card">
        <h1>Frase Aleatória</h1>
        <p>{advice}</p>
        <button onClick={getOneAdvice}>Gerar Nova Frase</button>
      </div>
    </div>
  );
}
