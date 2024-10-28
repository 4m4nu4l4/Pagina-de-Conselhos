// import advice from '../../../backend/src/model/advice'
import api from './api'
export const createADvice = async (token, adviceData) => {
    // Verifica se o token foi fornecido
    if (!token) {
        throw new Error("Token não fornecido");
    }

    try {
        const response = await fetch('http://localhost:3000/api/v1/advice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(adviceData),
        });

        // Verifica o status da resposta
        if (!response.ok) {
            // Tenta obter o texto da resposta para entender melhor o erro
            const responseBody = await response.text();
            throw new Error(`Erro ao criar conselho: ${response.status} - ${responseBody}`);
        }

        // Tenta obter o JSON da resposta
        const responseBody = await response.json();
        return responseBody;

    } catch (error) {
        // Captura e lança qualquer erro que ocorrer durante o processo
        throw new Error(`Erro na requisição: ${error.message}`);
    }
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
        console.log("Token na chamada da API:", token); // Log do token
        const response = await api.get(`/api/v1/advice/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        console.error("Erro ao buscar conselhos:", error);
        throw error; // Re-lança o erro para ser tratado na função chamadora
    }
};


export const getMonthAdvice = async () => {
    const response = await api.get(`/api/v1/advice/month`)
    return response.data
}

export const getOneAdvice = async (token) => {
    const response = await api.get('/api/v1/advice/one', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status !== 200) { // Verifica o status da resposta
        throw new Error('Erro ao buscar conselho');
    }

    return response.data; // Retorna os dados diretamente
};
