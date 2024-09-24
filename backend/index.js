const express = require("express");
const router = require("./src/routes/user");
const database = require('./src/config/database');


const app = express();
app.use(express.json());

app.use("/api/v1/user", router)

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta - 3000");
        }); //ouvinte, recebe o valor da porta
    })
    .catch((e) => {
        console.error("Erro ao conectar com o Banco", e)
    })



