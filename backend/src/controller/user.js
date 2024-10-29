const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "exemplo";
const SALT_VALUE = 10;

const validando = (email) => {
  return email.endsWith('@alunos.sc.senac.br');
};

class UserController {

  async createUser(nome, email, password) {
    if (!nome || !email || !password) {
      throw new Error("Os campos são obrigatório!");
    }
    if (!validando(email)) {
      throw new Error("O e-mail deve ser do senac");
    } else {
      if (email === "admin@alunos.sc.senac.br" || email === "emanuele.pries@alunos.sc.senac.br" || email === "maria.benevenutti@alunos.sc.senac.br") {
        const cypherSenha = await bcrypt.hash(String(password), SALT_VALUE);
        const userValue = await user.create({
          nome,
          email,
          password: cypherSenha,
          permissao: "admin"
        });
        return userValue;
      } else {
        const cypherSenha = await bcrypt.hash(String(password), SALT_VALUE);
        const userValue = await user.create({
          nome,
          email,
          password: cypherSenha,
          permissao: "viewer"
        });
        return userValue;
      }
    }
  }

  async findUser(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const userValue = await user.findByPk(id);
    if (!userValue) {
      throw new Error("Usuário não encontrado.");
    }
    return userValue;
  }

  async update(id, nome, email) {
    const oldUser = await user.findByPk(id);
    if (email) {
      const sameEmail = await user.findOne({ where: { email } });
      if (sameEmail && sameEmail.id !== id) {
        throw new Error("Email já cadastrado.");
      }
    }
    oldUser.nome = nome || oldUser.nome;
    oldUser.email = email || oldUser.email;
    oldUser.save();
    return oldUser;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const userValue = await this.findUser(id);
    userValue.destroy();

    return;
  }

  async find() {
    return user.findAll();
  }

  async login(email, password) {
    if (email === undefined || password === undefined) {
      throw new Error("Email e password são obrigatórios.");
    }
    const userValue = await user.findOne({ where: { email } });
    console.log(userValue)
    if (!userValue) {
      throw new Error("[1] Usuário e password inválidos.");
    }
    const passwordValida = bcrypt.compare(String(password), userValue.password);
    if (!passwordValida) {
      throw new Error("[2] Usuário e password inválidos.");
    }
    return jwt.sign({ id: userValue.id, role: userValue.permissao }, SECRET_KEY, { expiresIn: 120 * 120 });
  }

  async blockUser(id) {
    try {
      const userToBlock = await user.findByPk(id);
      if (!userToBlock) {
        throw new Error('Usuário não encontrado.');
      }
      // userToBlock.isBlocked = true;
      userToBlock.bloqueado = 1
      await userToBlock.save();
      return { message: 'Usuário bloqueado com sucesso.' };
    } catch (error) {
      throw new Error('Erro ao bloquear o usuário: ' + error.message);
    }
  }

  async unblockUser(id) {
    try {
      const userToUnblock = await user.findByPk(id);
      if (!userToUnblock) {
        throw new Error('Usuário não encontrado.');
      }
      userToUnblock.bloqueado = 0;
      await userToUnblock.save();
      return { message: 'Usuário desbloqueado com sucesso.' };
    } catch (error) {
      throw new Error('Erro ao desbloquear o usuário: ' + error.message);
    }
  }
}

module.exports = new UserController();

