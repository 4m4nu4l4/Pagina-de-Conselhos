const UserModel = require('../model/user')

class UserController {
    findAll() {
        return UserModel.findAll
    }

    findOne(index) {
        return index
    }

    create(email,password){
        return email
    }

    update(index, email, password) {
        return index
    }

    delete(index) {
        return index;
    }
}