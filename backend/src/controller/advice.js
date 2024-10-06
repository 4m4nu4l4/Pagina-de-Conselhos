const advice = require("../model/advice");

class AdviceController {
    
    static async createAdvice(advice, userId) {
        try {
            const newAdvice = await advice.create({ advice, userId });
            return newAdvice;
        } catch (error) {
            throw new Error('Erro ao criar o conselho: ' + error.message);
        }
    }

    static async getAllUserAdvice(userId) {
        try {
            const userAdvices = await advice.findAll({ where: { userId } });
            return userAdvices;
        } catch (error) {
            throw new Error('Erro ao listar os conselhos: ' + error.message);
        }
    }

    static async getAllAdvices() {
        try {
            const allAdvices = await advice.findAll();
            return allAdvices;
        } catch (error) {
            throw new Error('Erro ao listar os conselhos: ' + error.message);
        }
    }

    static async updateAdvice(id, advice) {
        try {
            const adviceToUpdate = await advice.findByPk(id);
            if (!adviceToUpdate) {
                throw new Error('Conselho não encontrado.');
            }
            adviceToUpdate.advice = advice;
            await adviceToUpdate.save();
            return adviceToUpdate;
        } catch (error) {
            throw new Error('Erro ao atualizar o conselho: ' + error.message);
        }
    }

    static async deleteAdvice(id) {
        try {
            const adviceToDelete = await advice.findByPk(id);
            if (!adviceToDelete) {
                throw new Error('Conselho não encontrado.');
            }
            await adviceToDelete.destroy();
            return { message: 'Conselho deletado com sucesso.' };
        } catch (error) {
            throw new Error('Erro ao deletar o conselho: ' + error.message);
        }
    }
}

module.exports = AdviceController;
