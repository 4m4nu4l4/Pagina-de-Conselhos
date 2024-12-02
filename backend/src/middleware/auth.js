const jwt = require("jsonwebtoken");
const user = require('../controller/user');

function authMiddleware(roles = []) {
  return async (req, res, next) => {

    const token = req.headers["authorization"];
    console.log(token);
    if (!token) {
      return res.status(400).json({ mensagem: "Token não fornecido" });
    }
    try {
      const decoded = jwt.verify(token, "exemplo");
      console.log(decoded);
      const userIdValue = await decoded.id;
      const userLogged = await user.findUser(userIdValue);
      if (!userLogged) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
      if (roles.length && !roles.includes(userLogged.permissao)) {
        return res.status(403).json({ mensagem: "Sem permissão" });
      }
      req.session = userLogged;
      next();
    } catch (err) {
      console.log(err)
      return res.status(401).json({ mensagem: "Token inválido" });
    }
  };
}

module.exports = authMiddleware;