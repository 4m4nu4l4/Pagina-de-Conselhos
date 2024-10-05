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
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// declarando a parte inicial das rotas do usuário 
app.use('/api/v1/user', UserRouter);
app.use("/api/v1/advice", AdviceRouter);

// Rota para criar conselho (usuário - fetch)
app.post("/api/v1/advice", AdviceApi.createAdvice) 
app.post("/api/v1/fetch", AdviceApi.createFetch)

// Rotas sem token
app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);

app.use("/api/v1/user", authMiddleware, UserRouter);

database.db
  .sync({ force: false })
  .then((_) => {
    if (!process.env.TEST) {
      app.listen(3000, (_) => {
        console.log("Server running on port 3000");
      });
    }
  })
  .catch((e) => {
    console.error(`Erro ao inicializar o banco de dados ${e}`);
  });

module.exports = app;