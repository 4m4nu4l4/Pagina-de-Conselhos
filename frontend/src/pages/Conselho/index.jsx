import React, { useState, useEffect, useContext } from "react";
import { getAllAdvice, createADvice } from "../../api/advice"; 
import { AuthContext } from "../../auth/Context"; 
import { toast } from "react-toastify"; 
import "./styles.css"; 
import notes from "../../assets/svg/notes.svg"; 

export default function Conselho() {
    const [showForm, setShowForm] = useState(false);
    const [notesList, setNotesList] = useState([]);
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

                const newAdvice = await createADvice(token, { 
                    advice: addText, 
                    userId: userId 
                }); 

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
                        {note.advice}
                    </div>
                ))}
            </div>
        </div>
    );
}