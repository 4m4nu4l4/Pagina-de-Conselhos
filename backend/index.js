const express = require("express");
const cors = require("cors");
const database = require("./src/config/database");
const UserApi = require("./src/api/user");
const UserRouter = require("./src/routes/user");
const AdviceApi = require("./src/api/advice");
const AdviceRouter = require('./src/routes/advice');
const authMiddleware = require("./src/middleware/auth");

const app = express();
app.use(express.json());
app.use(cors()); //podemos informar métodos, urls que deveram ser aceitos

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// declarando a parte inicial das rotas do usuário 
app.use('/api/v1/user', UserRouter);
app.use("/api/v1/advice", AdviceRouter);

// Rota para criar conselho (usuário - fetch)
app.post("/api/v1/advice", AdviceApi.createAdvice) 
app.post("/api/v1/fetch", AdviceApi.createFetch) // rota para criar conselhos com fetch na API

// Rotas sem token
app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);

app.use("/api/v1/user", authMiddleware, UserRouter);

const User = require('../backend/src/model/user'); 
const Advice = require('../backend/src/model/advice'); 

// Defina as associações
User.hasMany(Advice, { foreignKey: 'userId' });
Advice.belongsTo(User, { foreignKey: 'userId' });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

(async () => {
  try {
    await database.db.authenticate(); // Teste a conexão
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    
    // Sincronize os modelos com o banco de dados (apenas para teste)
    await database.db.sync({ force: false }); // Isso recria as tabelas
    console.log("Modelos sincronizados com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
})();

module.exports = app;