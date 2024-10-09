import api from './api'

/*
Rotas do backend:

router.get("/context", UserApi.findContext);
router.put("/:id", authMiddleware(['viewer', 'admin']), UserApi.updateUser);
router.get("/", authMiddleware(['admin']), UserApi.findUsers);
router.delete("/:id", authMiddleware(['viewer', 'admin']), UserApi.deleteUser);
router.put("/:id/block", authMiddleware(['admin']), UserApi.blockUser);
router.put("/:id/unblock", authMiddleware(['admin']), UserApi.unblockUser);

app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);
*/

// user é um objeto (name, email, password)

// função para criar usuário e enviar para o backend (depois precisa fazer conforme o nível do usuário)
export const createUser = async (user) => {
    const response = await api.post('/api/v1/user', user)
    return response.data // pega o endpoint e envia uma req com o objeto de usuários
}
export const updateUser = async (id, user) => {
    const response = await api.put(`/api/v1/user/{id}`, user)
    return response.data
}
export const deleteUser = async (id) => {
    return api.delete(`/api/v1/user/{id}`)
}
export const findContext = async (id) => {
    const response = await api.get(`/api/v1/user/{id}`)
    return response.data
}
export const findUsers = async () => {
    const response = await api.post('/api/v1/user')
    return response.data
}
export const login = async (email, password) => {
    const body = { email, password }
    const response = await api.post('/api/v1/login', body)
    return response.data
}