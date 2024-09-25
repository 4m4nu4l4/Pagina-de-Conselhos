const UserControllerv= require('../controller/user')

class UserApi {
    // findUser(req, res){
    //     res.send('get')
    // }

    
    async findUser(req, res) {
        try {
            const users = UserController.findAll()

            res.send({ users })
        } catch (e) {
            console.log(e)
            res.status(400).send('get')
        }
       
    }

    async createUser(req, res) {
        
        try {
            res.send('post')
        } catch (e) {
            console.log(e)
            res.status(400).send('get')
        }
        
    }

    async updateUser(req, res) {
        try {
            res.send('update')
        } catch (e) {
            console.log(e)
            res.status(400).send('get')
        }
        
    }

    async deleteUser(req, res) {
        try {
            //throw new Error("Deu ruim aqui")
            res.send('delete')
        } catch (e) {
            console.log(e)
            res.status(400).send('get')
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
        const { email, senha } = req.body
        console.log(req.body)
        try {
            const token = await UserController.login(email, senha)

            res.status(200).send({ token })
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }


}

module.exports = new UserApi()