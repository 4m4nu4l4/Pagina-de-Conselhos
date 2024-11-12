import "./styles.css";
import React, { useEffect, useState } from "react";
import wish from "../../assets/imgs/wish.png";
import { toast } from "react-toastify";
import { getMonthAdvice } from "../../api/advice";

export default function CardMensal() {
  const [advices, setAdvices] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const getAllMonthAdvice = async () => {
    setLoading(true);
    try {
      const data = await getMonthAdvice();
      if (!data) {
        throw new Error("Erro ao buscar conselhos");
      }
      setAdvices(data.slice(0, 7));
      toast.dismiss();
      toast.success("Conselhos carregados com sucesso!");
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.dismiss();
      toast.error("Erro ao carregar os conselhos. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMonthAdvice();
  }, []);

  return (
    <div id="container">
      <p id="title">
        Com 7 dias à sua frente, você tem 7 novas oportunidades de se tornar a melhor versão de si mesmo. Descubra o que a Wish Daily preparou para você neste mês!
      </p>
      <div id="cards-container">
        {loading ? (
          <p>Carregando conselhos...</p>
        ) : advices.length > 0 ? (
          advices.map((conselho, index) => (
            <div className="card" key={conselho.id}> {/* Usando conselho.id como chave */}
              <img src={wish} className="card-image" alt="Ilustração de desejos" loading="lazy" />
              <p className="title-notes">Dia {index + 1}</p>
              <p>{conselho.advice}</p> {/* Acessando a propriedade 'advice' */}
            </div>
          ))
        ) : (
          <p>Estamos preparando conselhos incríveis para você! Aguarde um momento...</p>
        )}
      </div>
    </div>
  );
}