import { AuthContext } from "../../auth/Context"; // ajuste o caminho conforme o seu projeto
import { blockUser, findUsers, unblock, updateUser } from "../../api/user";
import React, { useEffect, useState, useContext } from "react";
import "./style-bloquear.css";
import usersIcon from "../../assets/svg/users.svg";
import { toast } from "react-toastify";

export default function Bloquear() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const { token } = useContext(AuthContext);

    const handleSubmit = async (id) => {
        try {
            const response = await blockUser(id);
            if (response.message) {
                console.log('Usuário Bloqueado!');
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === id ? { ...user, bloqueado: true } : user
                    )
                );
            } else {
                toast.error("Erro ao bloquear o usuário.");
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("Sem permissão.");
            } else {
                toast.error("Erro ao bloquear o usuário.");
            }
        }
    };

    const handleSubmitUnblock = async (id) => {
        try {
            const response = await unblock(id);
            if (response.message) {
                console.log('Usuário Desbloqueado!');
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === id ? { ...user, bloqueado: false } : user
                    )
                );
            } else {
                toast.error("Erro ao desbloquear o usuário.");
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("Sem permissão.");
            } else {
                toast.error("Erro ao desbloquear o usuário.");
            }
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setUpdatedData({ nome: user.nome, email: user.email }); 
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(editingUser.id, updatedData);
            console.log(response)
            toast.success("Usuário atualizado com sucesso.");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("Sem permissão.");
            } else {
                toast.error("Erro ao atualizar o usuário. [2]");
            }
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;

            try {
                const data = await findUsers();
                console.log(data)
                setUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error.response?.data || error.message);
                alert("Não foi possível carregar os usuários. Verifique a conexão ou entre em contato com o suporte.");
            }
        };

        fetchUsers();
    }, [token]);

    return (
        <div id="containerBloquear">
            <div id="infoContainer">
                <h1 id="title">Gestão de Usuários</h1>
                <p id="subtitle">
                    Esta página é exclusiva para administradores do sistema de conselhos - Wish Daily. Gerencie usuários aqui.
                </p>

                <ul id="userList">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li 
                                key={user.id} 
                                className={`user-item ${user.bloqueado ? 'blocked' : ''}`}
                            >
                                <span className="user-name">{user.nome}</span>
                                <span className="user-email">{user.email}</span>
                                <div id="bloquear">
                                    <button className="bloquear" onClick={() => handleSubmit(user.id)}>Bloquear Usuário</button>
                                    <button className="bloquear" onClick={() => handleSubmitUnblock(user.id)}>Desbloquear Usuário</button>
                                    <button className="bloquear" onClick={() => handleEditClick(user)}>Editar</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="no-users">Nenhum usuário encontrado.</li>
                    )}
                </ul>
                {editingUser && (
                    <form id="form" onSubmit={handleUpdateSubmit}>
                        <p>Editar Usuário</p>
                        <label>
                            Nome:
                            <input 
                                className="input"
                                type="text" 
                                value={updatedData.nome} 
                                onChange={(e) => setUpdatedData({ ...updatedData, nome: e.target.value })} 
                                required 
                            />
                        </label>
                        <label id="labelEmail">
                            Email:
                            <input 
                                className="input"
                                type="email" 
                                value={updatedData.email} 
                                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })} 
                                required 
                            />
                        </label>
                        <div id="formAtualizar">
                            <button id="formButton" type="submit">Atualizar</button>
                            <button id="formButton" type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
                        </div>
                    </form>
                )}
            </div>
            <div id="imageContainer">
                <img id="userIcons" src={usersIcon} alt="Ícone de usuários" className="users-icon" />
            </div>
        </div>
    );
}