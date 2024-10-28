import React, { useState, useEffect, useContext } from "react";
import { getAllAdvice, createADvice } from "../../api/advice"; // Ajuste o caminho conforme necessário
import { AuthContext } from "../../auth/Context"; // Ajuste o caminho conforme necessário
import { toast } from "react-toastify"; // Assumindo que você está usando o Toastify para notificações
import "./styles.css"; // Importe o CSS conforme necessário
import notes from "../../assets/svg/notes.svg"; // Imagem para o botão

export default function Conselho() {
    const [showForm, setShowForm] = useState(false);
    const [notesList, setNotesList] = useState([]); // Lista para armazenar os conselhos
    const { token, userId } = useContext(AuthContext); // Obtém o token e o ID do usuário do contexto

    useEffect(() => {
        const fetchAdvices = async () => {
            try {
                if (!token) throw new Error("Token não disponível.");
                const response = await getAllAdvice(token); // Busca os conselhos da API
                setNotesList(response); // Armazena os conselhos retornados
            } catch (error) {
                console.error("Erro ao buscar conselhos:", error);
                toast.error("Erro ao buscar conselhos.");
            }
        };

        fetchAdvices(); // Chama a função para buscar os conselhos
    }, [token]);

    const toggleForm = () => {
        setShowForm(!showForm); // Alterna a exibição do formulário
    };
    
    const handleButtonClick = async () => {
      const addText = document.getElementById("add-notes-input").value.trim();
      if (addText !== "") {
          try {
              if (!userId) {
                  throw new Error("Usuário não encontrado ou não logado.");
              }
  
              console.log("Conselho:", addText); // Log do conselho
              console.log("ID do usuário:", userId); // Log do ID do usuário
  
              const newAdvice = await createADvice(token, { 
                  advice: addText, 
                  userId: userId 
              }); 
              console.log("Conselho criado:", newAdvice); // Log da resposta da API
  
              setNotesList((prevNotes) => [...prevNotes, newAdvice]);
              document.getElementById("add-notes-input").value = "";
              toast.success("Conselho publicado com sucesso!");
          } catch (error) {
              console.error("Erro ao cadastrar conselho:", error);
              toast.error("Erro ao cadastrar conselho.");
          }
      } else {
          toast.error("Por favor, insira um conselho.");
      }
  };
  

    return (
        <div id="container-conselho">
            <button id="button-add" onClick={toggleForm}>
                Coopere com um conselho
                <img src={notes} alt="Notas" />
            </button>
            {showForm && (
                <div id="hidden">
                    <p id="title-conselho">Contribua com um conselho para nossa rede:</p>
                    <div id="line-addAdvice"></div>
                    <input
                        type="text"
                        name="notes"
                        id="add-notes-input"
                        placeholder="Digite o seu conselho"
                    />
                    <button id="add-notes-button" onClick={handleButtonClick}>
                        Publicar
                    </button>
                </div>
            )}
            <div id="list-notes">
                {notesList.map((note) => (
                    <div key={note.id} className="note-item">
                        <strong>{note.User?.nome || "Usuário desconhecido"}</strong>: {note.advice}
                    </div>
                ))}
            </div>
        </div>
    );
}
