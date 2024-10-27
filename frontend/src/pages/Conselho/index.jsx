import React, { useState, useEffect } from "react";
import "./styles.css";
import notes from "../../assets/svg/notes.svg";
import { createADvice, updateAdvice, deleteAdvice } from "../../api/advice";

export default function Conselho({ userId, isAdmin }) {
  const [showForm, setShowForm] = useState(false);
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotesList(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesList));
  }, [notesList]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleButtonClick = async () => {
    const addText = document.getElementById("add-notes-input").value.trim();
    if (addText !== "") {
      try {
        const createNewAdvice = await createADvice(addText, userId); // Corrigido para usar addText
        setNotesList([...notesList, createNewAdvice]);
        document.getElementById("add-notes-input").value = "";
      } catch (error) {
        console.error("Erro ao criar -> ", error); // Corrigido para 'error'
      }
    } else {
      console.warn("O texto do conselho não pode ser vazio.");
    }
  };

  const handleUpdateClick = (index) => {
    const updatedNotes = [...notesList];
    updatedNotes[index].isEditing = true;
    setNotesList(updatedNotes);
  };

  const handleConfirmUpdate = async (index) => {
    const updatedNotes = [...notesList];
    const newText = document.getElementById(`edit-note-${index}`).value.trim();
    if (newText !== "") {
      try {
        await updateAdvice(updatedNotes[index].id, newText); // Atualizando com o novo texto
        updatedNotes[index].text = newText;
        updatedNotes[index].isEditing = false;
        setNotesList(updatedNotes);
      } catch (error) {
        console.error("Erro ao atualizar conselho:", error);
      }
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteAdvice(id); // Chamando a função para deletar conselho
      setNotesList(notesList.filter((note) => note.id !== id)); // Remove o conselho da lista
    } catch (error) {
      console.error("Erro ao deletar conselho:", error);
    }
  };
  return (
    <div id="container-conselho">
      <button id="button-add" onClick={toggleForm}>
        Coopere com um conselho
        <img src={notes} alt="notes" />
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
        {notesList.map((note, index) => (
          <div key={note.id}>
            <strong>{note.userName}</strong>: {note.text} {/* Mostrando o nome do usuário */}
            {note.isEditing ? (
              <>
                <input
                  type="text"
                  id={`edit-note-${index}`}
                  defaultValue={note.text}
                  placeholder="Digite o novo texto"
                />
                <button onClick={() => handleConfirmUpdate(index)}>Confirmar</button>
              </>
            ) : (
              <div className="buttons">
                {isAdmin && (
                  <>
                    <button onClick={() => handleUpdateClick(index)}>Atualizar Publicação</button>
                    <button onClick={() => handleDeleteClick(note.id)}>Deletar Publicação</button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );  
}