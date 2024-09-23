const { Sequelize } = require("sequelize");

class Database {

    init(){
        this.db = new Sequelize({
            database:"exemplo",
            host:"localhost",
            password:"",
            username:"root",
            dialect:"mysql"

        })

    }
}