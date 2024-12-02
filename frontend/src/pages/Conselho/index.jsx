import React, { useState, useEffect, useContext } from "react";
import { getAllAdvice, createADvice, updateAdvice, deleteAdvice } from "../../api/advice";
import { AuthContext } from "../../auth/Context";
import { toast } from "react-toastify";
import "../Conselho/styles.css";
import notes from "../../assets/svg/notes.svg";

export default function Conselho() {
    const [showForm, setShowForm] = useState(false);
    const [notesList, setNotesList] = useState([]);
    const [editingAdvice, setEditingAdvice] = useState(null);
    const [editingText, setEditingText] = useState("");
    const { token, userId } = useContext(AuthContext);

    useEffect(() => {
        const fetchAdvices = async () => {
            try {
                if (!token) throw new Error("Token não disponível.");
                const response = await getAllAdvice(token);
                setNotesList(response);
            } catch (error) {
                console.error("Erro ao buscar conselhos:", error);
                toast.error("Erro ao buscar conselhos.");
            }
        };

        fetchAdvices();
    }, [token]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleButtonClick = async () => {
        const addText = document.getElementById("add-notes-input").value.trim();
        if (addText !== "") {
            try {
                if (!userId) {
                    throw new Error("Usuário não encontrado ou não logado.");
                }

                const adviceData = await createADvice({
                    advice: addText,
                });

                setNotesList((prevNotes) => [...prevNotes, adviceData]);
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

    const handleEditClick = (note) => {
        setEditingAdvice(note.id);
        setEditingText(note.advice);
    };

    const handleEditSave = async () => {
        try {
            const updatedAdvice = await updateAdvice(editingAdvice, editingText);
            setNotesList((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === editingAdvice ? updatedAdvice : note
                )
            );
            setEditingAdvice(null);
            setEditingText("");
            toast.success("Conselho atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar conselho:", error);
            toast.error("Erro ao atualizar conselho.");
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await deleteAdvice(id);
            setNotesList((prevNotes) => prevNotes.filter((note) => note.id !== id));
            toast.success("Conselho deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar conselho:", error);
            toast.error("Erro ao deletar conselho.");
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
                        {editingAdvice === note.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    style={{marginTop: '15px'}}
                                />
                                <button className="save-button" onClick={handleEditSave}>Salvar</button>
                                <button className="cancel-button" onClick={() => setEditingAdvice(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <>
                                <p>{note.advice}</p>
                                <div className="note-actions">
                                    <button className="edit-button" onClick={() => handleEditClick(note)}>
                                        Editar
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeleteClick(note.id)}>
                                        Deletar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
