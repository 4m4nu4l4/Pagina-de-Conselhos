const database = require('../config/database');
const { Sequelize } = require('sequelize')
const userId = require('../model/advice');

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
            },
            userId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        });
    }
}

module.exports = new AdviceModel().model;