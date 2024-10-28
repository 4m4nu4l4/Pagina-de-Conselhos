import { AuthContext } from "../../auth/Context"; // ajuste o caminho conforme o seu projeto
import { findUsers } from "../../api/user";
import React, { useEffect, useState, useContext } from "react";
import "./style-bloquear.css";
import usersIcon from "../../assets/svg/users.svg";

export default function Bloquear() {
    const [users, setUsers] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;

            try {
                const data = await findUsers();
                return setUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error.response?.data || error.message);
                return alert("Não foi possível carregar os usuários. Verifique a conexão ou entre em contato com o suporte.");
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

                {/* Lista de usuários */}
                <ul id="userList">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li key={user.id} className="user-item">
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">{user.email}</span>
                            </li>
                        ))
                    ) : (
                        <li className="no-users">Nenhum usuário encontrado.</li>
                    )}
                </ul>
            </div>
            <div id="imageContainer">
                <img id="userIcons" src={usersIcon} alt="Ícone de usuários" className="users-icon" />
            </div>
        </div>
    );
}