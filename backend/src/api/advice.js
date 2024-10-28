const AdviceController = require('../controller/advice');

class AdviceApi {

    async createFetch(req, res) {
        try {
            const fetch = await AdviceController.createFetch();
            return res.status(201).send(fetch);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }
    
    async createAdvice(req, res) {
        try {
            const { advice } = req.body;
            const { userId } = req.user.id;
            const newAdvice = await AdviceController.createAdvice(advice, userId);
            return res.status(201).send(newAdvice);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async getAllUserAdvice(req, res) {
        try {
            const { userId } = req.params;
            const advices = await AdviceController.getAllUserAdvice(userId);
            return res.status(200).send(advices);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async getAllAdvices(req, res) {
        console.log(req.headers);
        try {
            const advices = await AdviceController.getAllAdvices(); // Removido `userId` pois não é necessário
            console.log(advices);
            return res.status(200).send(advices);
        } catch (e) {
            console.error("Erro ao buscar conselhos:", e.message);
            res.status(400).send({ error: e.message });
        }
    }

    async getMonthAdvice(req, res) {
        try {
            const advices = await AdviceController.getMonthAdvice(); // Removido `userId` pois não é necessário
            return res.status(200).send(advices);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async getOneAdvice(req, res) {
        try {
            const oneAdvice = await AdviceController.getOneAdvice(); // Obtém um conselho
            return res.status(200).send(oneAdvice);
        } catch (error) {
            console.error(error.message);
            res.status(400).send({ error: error.message }); // Retorna erro em caso de falha
        }
    }

    async updateAdvice(req, res) {
        try {
            const { id } = req.params;
            const { advice } = req.body;
            const updatedAdvice = await AdviceController.updateAdvice(id, advice);
            return res.status(200).send(updatedAdvice);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async deleteAdvice(req, res) {
        try {
            const { id } = req.params;
            await AdviceController.deleteAdvice(id);
            return res.status(200).send({ message: 'Conselho deletado com sucesso' });
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }
}

module.exports = new AdviceApi();
