// import advice from '../../../backend/src/model/advice'
import api from './api'

export const createADvice = async (advice, userId) => {
    const response = await api.post('/api/v1/advice', advice, userId)
    return response.data
}

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

export const getllAdvice = async () => {
    const response = await api.get(`/api/v1/advice/`)
    return response.data
}

export const getMonthAdvice = async () => {
    const response = await api.get(`/api/v1/advice/month`)
    return response.data
}