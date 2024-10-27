const adviceModel = require("../model/advice");

const mockAdviceList = [
    { slip: { id: 1, advice: "Stay curious, keep learning.", userId: "null" } },
    { slip: { id: 2, advice: "Don't compare yourself to others.", userId: "null" } },
    { slip: { id: 3, advice: "Consistency is the key to success.", userId: "null" } },
    { slip: { id: 4, advice: "Learn from your mistakes.", userId: "null" } },
    { slip: { id: 5, advice: "Take breaks when you need them.", userId: "null" } },
    { slip: { id: 6, advice: "Set realistic goals.", userId: "null" } },
    { slip: { id: 7, advice: "Practice gratitude daily." } },
    { slip: { id: 8, advice: "Stay positive, even in tough times.", userId: "null" } },
    { slip: { id: 9, advice: "Help others whenever you can.", userId: "null" } },
    { slip: { id: 10, advice: "Challenge yourself regularly.", userId: "null" } },
    { slip: { id: 11, advice: "Don’t fear failure, embrace it.", userId: "null" } },
    { slip: { id: 12, advice: "Be patient with your progress.", userId: "null" } },
    { slip: { id: 13, advice: "Surround yourself with positive people.", userId: "null" } },
    { slip: { id: 14, advice: "Keep a balance between work and life.", userId: "null" } },
    { slip: { id: 15, advice: "Listen more than you speak.", userId: "null" } },
    { slip: { id: 16, advice: "Stay humble, no matter your success.", userId: "null" } },
    { slip: { id: 17, advice: "Make time for the things you love.", userId: "null" } },
    { slip: { id: 18, advice: "Embrace change, it leads to growth.", userId: "null" } },
    { slip: { id: 19, advice: "Stay focused on your goals.", userId: "null" } },
    { slip: { id: 20, advice: "Take care of your mental health.", userId: "null" } },
    { slip: { id: 21, advice: "Celebrate your small wins.", userId: "null" } },
    { slip: { id: 22, advice: "Never stop dreaming big.", userId: "null" } },
    { slip: { id: 23, advice: "Be kind to yourself and others.", userId: "null" } },
    { slip: { id: 24, advice: "Trust the process, success takes time.", userId: "null" } },
    { slip: { id: 25, advice: "Always be willing to learn something new.", userId: "null" } },
    { slip: { id: 26, advice: "Stay disciplined, motivation will follow.", userId: "null" } },
    { slip: { id: 27, advice: "Keep your priorities in check.", userId: "null" } },
    { slip: { id: 28, advice: "Remember to enjoy the journey.", userId: "null" } },
    { slip: { id: 29, advice: "Let go of things you can't control.", userId: "null" } },
    { slip: { id: 30, advice: "Be open to constructive criticism.", userId: "null" } },
    { slip: { id: 31, advice: "Stay adaptable, life is unpredictable.", userId: "null" } },
    { slip: { id: 32, advice: "Invest in yourself, it’s the best return.", userId: "null" } },
    { slip: { id: 33, advice: "Don't dwell on the past, focus on the future.", userId: "null" } },
    { slip: { id: 34, advice: "Keep pushing forward, even if it's slow.", userId: "null" } },
    { slip: { id: 35, advice: "Believe in your potential.", userId: "null" } },
    { slip: { id: 36, advice: "Take responsibility for your actions.", userId: "null" } },
    { slip: { id: 37, advice: "Forgive yourself and others.", userId: "null" } },
    { slip: { id: 38, advice: "Stay organized, it reduces stress.", userId: "null" } },
    { slip: { id: 39, advice: "Learn to say no when necessary.", userId: "null" } },
    { slip: { id: 40, advice: "Don’t be afraid to take risks.", userId: "null" } },
    { slip: { id: 41, advice: "Stay honest with yourself.", userId: "null" } },
    { slip: { id: 42, advice: "Take time to reflect on your progress.", userId: "null" } },
    { slip: { id: 43, advice: "Embrace challenges, they build character.", userId: "null" } },
    { slip: { id: 44, advice: "Be mindful of your thoughts and actions.", userId: "null" } },
    { slip: { id: 45, advice: "Take care of your body, it’s your only home.", userId: "null" } },
    { slip: { id: 46, advice: "Stay grounded, no matter the highs or lows.", userId: "null" } },
    { slip: { id: 47, advice: "Focus on solutions, not problems.", userId: "null" } },
    { slip: { id: 48, advice: "Learn to manage your time effectively.", userId: "null" } },
    { slip: { id: 49, advice: "Be proactive, not reactive.", userId: "null" } },
    { slip: { id: 50, advice: "Remember, progress is better than perfection.", userId: "null" } }
];


class AdviceController {

    async createFetch() {
        try {
            return new Promise(async (resolve) => {
                setTimeout(async () => {
                    const randomAdvice = mockAdviceList[Math.floor(Math.random() * mockAdviceList.length)];
                    const adviceValue = await adviceModel.create({
                        advice: randomAdvice.slip.advice
                    });
                    resolve(adviceValue);
                }, 100);
            });
        } catch (error) {
            throw new Error('Erro ao criar o conselho: ' + error.message);
        }
    }   
    
    async createAdvice(advice, userId) {
        try {
            const newAdvice = await adviceModel.create({ advice, userId });
            return newAdvice;
        } catch (error) {
            throw new Error('Erro ao criar o conselho: ' + error.message);
        }
    }

    async getAllUserAdvice(userId) {
        try {
            const userAdvices = await adviceModel.findAll({ where: { userId } });
            return userAdvices;
        } catch (error) {
            throw new Error('Erro ao listar os conselhos: ' + error.message);
        }
    }

    async getAllAdvices() {
        try {
            const allAdvices = await adviceModel.findAll();
            return allAdvices;
        } catch (error) {
            throw new Error('Erro ao listar os conselhos: ' + error.message);
        }
    }

    async getMonthAdvice() {
        try {
            const allMonthAdvices = await adviceModel.findAll({ limit: 30 });
            console.log("Conselhos retornados:", allMonthAdvices); // Verifique a saída aqui
            return allMonthAdvices;
        } catch (error) {
            throw new Error('Erro ao listar os conselhos: ' + error.message);
        }
    }    

    async updateAdvice(id, advice) {
        try {
            const adviceToUpdate = await adviceModel.findByPk(id);
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

    async deleteAdvice(id) {
        try {
            const adviceToDelete = await adviceModel.findByPk(id);
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

module.exports = new AdviceController();