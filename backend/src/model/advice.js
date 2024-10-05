const database = require("../config/database")
const { Sequelize } = require("sequelize")

class AdviceModel {
    constructor() {
        this.model = database.db.define("advices", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            advice: {
                type: Sequelize.STRING,
            }
        });
    }
}

module.exports = new AdviceModel().model;