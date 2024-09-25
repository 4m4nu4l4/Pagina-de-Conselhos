const database = require('../config/database')


// const usersMock = new Array({
//     email: "Maria@maria.com.br",
//     password: "123456"
// })

class UserModel {
    constructor() {
        this.model = database.db.define("users", {
            id: {
                type: database.db.Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            permissao: {
                type: database.db.Sequelize.STRING,
                validate: {
                    isIn: [["adimn", "viewer"]]
                },
            },
        });
    }
}

module.exports = new UserModel()