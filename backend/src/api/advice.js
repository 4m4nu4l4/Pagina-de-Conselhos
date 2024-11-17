const AdviceController = require('../controller/advice');

class AdviceApi {

    async createFetch(req, res) {
        try {
            const fetch = await AdviceController.createFetch();
            return res.status(201).json(fetch);
        } catch (error) {
            console.error("Erro ao criar fetch:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    async createAdvice(req, res) {
        try {
            const { advice } = req.body;
            const userId = req.session.id;
            console.log(userId,req.session);
            const newAdvice = await AdviceController.createAdvice(advice, userId);
            console.log(newAdvice);
            return res.status(201).json(newAdvice);
        } catch (error) {
            console.error("Erro ao criar conselho:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    async getAllUserAdvice(req, res) {
        try {
            const { userId } = req.params;
            const advices = await AdviceController.getAllUserAdvice(userId);
            return res.status(200).json(advices);
        } catch (error) {
            console.error("Erro ao buscar conselhos do usuário:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

  
    async getAllAdvices(req, res) {
        try {
            const advices = await AdviceController.getAllAdvices();
            return res.status(200).json(advices);
        } catch (error) {
            console.error("Erro ao buscar todos os conselhos:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    async getMonthAdvice(req, res) {
        try {
            const advices = await AdviceController.getMonthAdvice();
            return res.status(200).json(advices);
        } catch (error) {
            console.error("Erro ao buscar conselhos do mês:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

   
    async getOneAdvice(req, res) {
        try {
            console.log ("batata");
            const oneAdvice = await AdviceController.getOneAdvice();
            return res.status(200).json(oneAdvice);
        } catch (error) {
            console.error("Erro ao buscar um conselho:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    
    async updateAdvice(req, res) {
        try {
            const { id } = req.params;
            const { advice } = req.body;
            const updatedAdvice = await AdviceController.updateAdvice(id, advice);
            return res.status(200).json(updatedAdvice);
        } catch (error) {
            console.error("Erro ao atualizar conselho:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    
    async deleteAdvice(req, res) {
        try {
            const { id } = req.params;
            await AdviceController.deleteAdvice(id);
            return res.status(200).json({ message: 'Conselho deletado com sucesso' });
        } catch (error) {
            console.error("Erro ao deletar conselho:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AdviceApi();
