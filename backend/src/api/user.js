const UserController = require('../controller/user')

class UserApi {
    async createUser(req, res) {
        const { nome, email, password } = req.body

        try {
            const user = await UserController.createUser(nome, email, password)
            return res.status(201).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar usuário ${e.message}`})
        }
    }

    async updateUser(req, res) {
        const { id } = req.params
        const { nome, email, password } = req.body

        try {
            const user = await UserController.update(Number(id), nome, email, password)
            return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar usuário ${e.message}`})
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params

        try {
            await UserController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário ${e.message}`})
        }
    }

    async findUsers(req, res) {
        try {
            const users = await UserController.find()
            return res.status(200).send(users)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuário ${e.message}`})
        }
    }

    async findContext(req, res) {
        try {
            const user = await UserController.findUser(req?.session?.id || 0)
            return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuário ${e.message}`})
        }
    }

    async login(req, res) {
        const { email, password } = req.body
        console.log(req.body)
        try {
            const token = await UserController.login(email, password)

            res.status(200).send({ token })
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new UserApi()