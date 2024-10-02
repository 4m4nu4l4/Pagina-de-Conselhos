const database = require('../config/database');
const { Sequelize } = require('sequelize'); // Importação do Sequelize diretamente se necessário

class UserModel {
    constructor() {
        this.model = database.db.define("users", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permissao: {
                type: Sequelize.STRING,
                validate: {
                    isIn: [["admin", "viewer"]]
                },
            },
        });
    }
}

module.exports = new UserModel().model;
