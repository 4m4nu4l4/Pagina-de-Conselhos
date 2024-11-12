const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    this.init();
  }

  init() {
    // postgresql://localhost:0g06CpmodK5tK4jqWJ5w61kSHNfTRnVc@dpg-cslatcm8ii6s73d9eafg-a.oregon-postgres.render.com/pagina_conselho
    this.db = new Sequelize({
      dialect: "postgres",
      database: "paginaconselho",
      host: "localhost",
      username: "postgres",
      password: "123456"
      });
  }
}

module.exports = new Database();