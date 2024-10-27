import "./styles.css";
import React, { useEffect, useState } from "react";
import wish from "../../assets/imgs/wish.png";
import { toast } from "react-toastify";
import { getMonthAdvice } from "../../api/advice";

export default function CardMensal() {
  const [advices, setAdvices] = useState([]); // Estado para armazenar conselhos
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Função para buscar conselhos
  const getAllAdvice = async () => {
    setLoading(true); // Inicia o estado de carregamento
    try {
      const response = await getMonthAdvice()
      if (!response.ok) throw new Error("Erro ao buscar conselhos"); // Tratamento de erro
      const data = await response.json();
      setAdvices(data.slice(0, 30)); // Limita a 30 conselhos
      toast.success("Conselhos carregados com sucesso!"); // Notificação de sucesso
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error("Erro ao carregar os conselhos. Tente novamente!"); // Notificação de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // useEffect para carregar conselhos ao montar o componente
  useEffect(() => {
    getAllAdvice();
  }, []);

  return (
    <div id="container">
      <p id="title">
        Com 30 dias à sua frente, você tem 30 novas oportunidades de se tornar a melhor versão de si mesmo. Descubra o que a Wish Daily preparou para você neste mês!
      </p>
      <div id="cards-container">
        {loading ? (
          <p>Carregando conselhos...</p>
        ) : advices.length > 0 ? (
          advices.map((conselho, index) => (
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
