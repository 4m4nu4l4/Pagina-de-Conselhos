const express = require("express");
const router = require("./src/routes/user");

const app = express();
app.use(express.json());

app.use("/api/v1/user", router)

app.listen(3000, () => {
    console.log("Servidor rodando na porta - 3000");
}); //ouvinte, recebe o valor da porta