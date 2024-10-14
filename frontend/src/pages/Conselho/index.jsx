import React, { useState, useEffect } from "react";
import "./styles.css";
import notes from "../../assets/svg/notes.svg";

export default function Conselho() {
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

  const handleButtonClick = () => {
    const addText = document.getElementById("add-notes-input").value.trim();
    if (addText !== "") {
      setNotesList([...notesList, { text: addText, isEditing: false }]);
      document.getElementById("add-notes-input").value = "";
    }
  };

  const handleUpdateClick = (index) => {
    const updatedNotes = [...notesList];
    updatedNotes[index].isEditing = true;
    setNotesList(updatedNotes);
  };

  const handleConfirmUpdate = (index) => {
    const updatedNotes = [...notesList];
    const newText = document.getElementById(`edit-note-${index}`).value.trim();
    if (newText !== "") {
      updatedNotes[index].text = newText;
      updatedNotes[index].isEditing = false;
      setNotesList(updatedNotes);
    }
  };

  return (
    <div id="container-conselho">
      <button id="button-add" onClick={toggleForm}>
        Coopere com um conselho
        <img src={notes} />
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
          <p key={index}>
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
              <>
                {note.text}
                <div className="buttons">
                  <button onClick={() => handleUpdateClick(index)}>Atualizar Publicação</button>
                </div>
              </>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}