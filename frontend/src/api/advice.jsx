// import advice from '../../../backend/src/model/advice'
import api from './api'
export const createADvice = async (adviceData) => {
    const response = await api.post(`/api/v1/advice`, adviceData )
    return response.data
};

export const updateAdvice = async (id, advice) => {
    const response = await api.post(`/api/v1/advice/${id}`, advice )
    return response.data
}

export const deleteAdvice = async (id) => {
    return api.delete(`/api/v1/advice/${id}`)
}

export const getUserAdvice = async (userId) => {
    const response = await api.get(`/api/v1/advice/${userId}`)
    return response.data
}

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
    console.log("oiaa")
    const response = await api.get(`/api/v1/advice/get/month`)
    console.log("oiaa",response)
    return response.data
}

export const getOneAdvice = async () => {
    const response = await api.get('/api/v1/advice/get/one');
    console.log(response)
    return response.data; 
};
