import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000
})

// função para pegar o token e enviar em cada requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if(token) {
            config.headers.Authorization = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api