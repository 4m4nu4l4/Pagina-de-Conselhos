import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../auth/Context';
import { findContext, updateUser } from "../../api/user";
import '../PagUsuario/styles.css';


const PagUsuario = () => {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Função para carregar os dados do usuário ao montar o componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await findContext();

        const data = await response;

        setUserData(data)
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  // Função para atualizar os dados do usuário
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const response = await updateUser(userId, userData);

      setSuccess("Dados atualizados com sucesso!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com as mudanças nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="edit-profile-container">
      <h1>Edite seu perfil aqui</h1>

      <p style={{ textAlign: 'center' }}>Esta tela é responsável pela edição das informações do usuário</p>
      <p style={{ textAlign: 'center', color: 'red' }}>Você poderá editar informações, como: nome do usuário e o e-mail utilizado dentro do sistema!</p>

      <p style={{fontWeight: '600'}}>Nome do usuário: {userData.nome}</p>
      <p style={{fontWeight: '500'}}>E-mail do usuário: {userData.email}</p>

      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="username">Nome:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button id="buttonPag" type="submit" disabled={loading}>
          {loading ? "Atualizando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
};

export default PagUsuario;
