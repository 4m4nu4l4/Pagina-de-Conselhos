const UserControllerv= require('../controller/user')

class UserApi {
    findUser(req, res){
        res.send('get')
    }
    //(req,res) => { res.send('get')}

    findUser(req, res) {
        try {
            const users = UserController.findAll()

            res.send({ users })
        } catch (e) {
            console.log(e)
            res.status(400).send('get')
        }
       
    }

    createUser(req, res) {
        
        try {
            res.send('post')
        } catch (e) {
            console.log(e)
            res.status(400).send('get')
        }
        
    }

    UpdateUser(req, res) {
        try {
            res.send('update')
        } catch (e) {
            console.log(e)
            res.status(400).send('get')
        }
        
    }

    DeleteUser(req, res) {
        try {
            //throw new Error("Deu ruim aqui")
            res.send('delete')
        } catch (e) {
            console.log(e)
            res.status(400).send('get')
        }
        
    }




}

module.exports = new UserApi()