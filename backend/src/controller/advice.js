const advice = require("../model/advice");


class AdviceController {
    
    static async createFetch() {
        try {
            return new Promise(async (resolve) => {
                setTimeout(async () => {
                    const randomAdvice = mockAdviceList[Math.floor(Math.random() * mockAdviceList.length)];
                    const adviceValue = await advice.create({
                        advice: randomAdvice.slip.advice
                    });
                    resolve(adviceValue);
                }, 100);
            });
        } catch (error) {
            throw new Error('Erro ao criar o conselho: ' + error.message);
        }
    }

    
    static async createAdvice(title, content, userId) {
        try {
            const newAdvice = await advice.create({ title, content, userId });
            return newAdvice;
        } catch (error) {
            throw new Error('Erro ao criar o conselho: ' + error.message);
        }
    }

    static async getAllAdvices(userId) {
        try {
            const userAdvices = await advice.findAll({ where: { userId } });
            return userAdvices;
        } catch (error) {
            throw new Error('Erro ao listar os conselhos: ' + error.message);
        }
    }

    static async updateAdvice(id, title, content) {
        try {
            const adviceToUpdate = await advice.findByPk(id);
            if (!adviceToUpdate) {
                throw new Error('Conselho não encontrado.');
            }
            adviceToUpdate.title = title;
            adviceToUpdate.content = content;
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
