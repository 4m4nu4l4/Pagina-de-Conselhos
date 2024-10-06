const jwt = require("jsonwebtoken");
const user = require('../controller/user');

// Middleware para autenticação e verificação de permissões
function authMiddleware(roles = []) {
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(400).json({ mensagem: "Token não fornecido" });
    }

    try {
      // Verifica e decodifica o token
      const decoded = jwt.verify(token, "exemplo");

      // Procura o usuário no banco de dados
      const userLogged = await user.findUser(decoded.id);

      if (!userLogged) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      // Verifica se o usuário tem a permissão necessária
      if (roles.length && !roles.includes(userLogged.permissao)) {
        return res.status(403).json({ mensagem: "Sem permissão" });
      }

      // Armazena as informações do usuário no objeto de request
      req.session = userLogged; // Atualizei para armazenar o usuário completo

      // Passa para o próximo middleware ou rota
      next();
    } catch (err) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }
  };
}

module.exports = authMiddleware;
