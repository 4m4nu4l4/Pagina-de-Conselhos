const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    this.init();
  }

  init() {
    // postgresql://localhost:0g06CpmodK5tK4jqWJ5w61kSHNfTRnVc@dpg-cslatcm8ii6s73d9eafg-a.oregon-postgres.render.com/pagina_conselho
    this.db = new Sequelize({
      database: "pagina_conselho",
      host: "dpg-cslatcm8ii6s73d9eafg-a.oregon-postgres.render.com",
      username: "localhost",
      dialect: "postgres",
      password: "0g06CpmodK5tK4jqWJ5w61kSHNfTRnVc",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }}
      });
    // this.db = new Sequelize({
    //   database: "Pag_conselhos",
    //   host: "localhost",
    //   username: "root",
    //   dialect: "mysql",
    //   password: "",
    //   pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000, // tempo máximo de tentativa de conexão (30 segundos)
    //     idle: 10000 // tempo ocioso antes de desconectar (10 segundos)
    //   },
    // });
  }
}

module.exports = new Database();