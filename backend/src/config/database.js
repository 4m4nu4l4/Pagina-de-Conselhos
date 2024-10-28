const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize({
      database: "Pag_conselhos",
      host: "localhost",
      username: "root",
      dialect: "mysql",
      password: "",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000, // tempo máximo de tentativa de conexão (30 segundos)
        idle: 10000 // tempo ocioso antes de desconectar (10 segundos)
      },
    });
  }
}

module.exports = new Database();