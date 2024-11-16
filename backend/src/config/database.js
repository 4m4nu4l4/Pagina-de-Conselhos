const { Sequelize } = require("sequelize");
require('dotenv').config();

class Database {
  constructor() {
    this.init();
  }

  init() {
    // postgresql://localhost:0g06CpmodK5tK4jqWJ5w61kSHNfTRnVc@dpg-cslatcm8ii6s73d9eafg-a.oregon-postgres.render.com/pagina_conselho
    this.db = new Sequelize({
      dialect: process.env.DB_DIALECT,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
      });
  }
}

module.exports = new Database();