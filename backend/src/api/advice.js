const AdviceController = require('../controller/advice');

class AdviceApi {
   
    async createAdvice(req, res) {
        try {
            const { title, content, userId } = req.body;
            const advice = await AdviceController.createAdvice(title, content, userId);
            return res.status(201).send(advice);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async getAllAdvices(req, res) {
        try {
            const { userId } = req.params;
            const advices = await AdviceController.getAllAdvices(userId);
            return res.status(200).send(advices);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async updateAdvice(req, res) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const updatedAdvice = await AdviceController.updateAdvice(id, title, content);
            return res.status(200).send(updatedAdvice);
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }

    async deleteAdvice(req, res) {
        try {
            const { id } = req.params;
            await AdviceController.deleteAdvice(id);
            return res.status(200).send({ message: 'Advice deleted successfully' });
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }
}

module.exports = new AdviceApi();
