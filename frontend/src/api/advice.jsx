// import advice from '../../../backend/src/model/advice'
import api from './api';

// Criar um conselho
export const createADvice = async (adviceData) => {
    const response = await api.post(`/api/v1/advice`, adviceData);
    return response.data;
};

// !!!!!!!!!!!! Função atualizada para corrigir o método HTTP e aceitar o token de autenticação
export const updateAdvice = async (id, advice, token) => {
    try {
        const response = await api.patch(
            `/api/v1/advice/${id}`, // Método PATCH para atualizar
            { advice }, // Dados do conselho
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Token de autenticação
                },
            }
        );
        return response.data; // Retorna os dados atualizados
    } catch (error) {
        console.error("Erro ao atualizar conselho:", error); // Log do erro para depuração
        throw error; // Repassa o erro para o chamador
    }
};

export const deleteAdvice = async (id) => {
    return api.delete(`/api/v1/advice/${id}`);
};

export const getUserAdvice = async (userId) => {
    const response = await api.get(`/api/v1/advice/${userId}`);
    return response.data;
};

export const getAllAdvice = async (token) => {
    try {
        console.log("Token na chamada da API:", token);
        const response = await api.get(`/api/v1/advice/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar conselhos:", error);
        throw error;
    }
};

export const getMonthAdvice = async () => {
    console.log("oiaa");
    const response = await api.get(`/api/v1/advice/get/month`);
    console.log("oiaa", response);
    return response.data;
};

export const getOneAdvice = async () => {
    const response = await api.get('/api/v1/advice/get/one');
    console.log(response);
    return response.data;
};
