import "./styles.css";
import React, { useState, useEffect } from "react";
import carrinho from "../../assets/imgs/carrinho.png";
import translate from 'translate';
import { toast } from "react-toastify";
import { getOneAdvice } from "../../api/advice";

export default function CardAleatorio() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOneAdvice = async () => {
    setLoading(true);
    try {
      const data = await getOneAdvice();
      if (data && data.advice) {
        const traduzido = await translate(data.advice, 'pt');
        setAdvice(traduzido); 
        toast.dismiss();
        toast.success('Conselho aleatório carregado com sucesso!');
      } else {
        throw new Error('Estrutura de dados inesperada');
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Erro ao carregar os conselho aleatório. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOneAdvice();
  }, []);

  return (
    <div id="display-aleatorio">
      <div id="img">
        <img src={carrinho} alt="Carrinho de compras" />
      </div>
      <div id="card">
        <h1>Frase Aleatória</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <p>{advice}</p>
        )}
        <button id="buttonAleatorio" onClick={fetchOneAdvice} disabled={loading}>
          {loading ? "Carregando..." : "Gerar Nova Frase"}
        </button>
      </div>
    </div>
  );
}