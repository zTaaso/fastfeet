import Problem from '../models/Problem';
import Delivery from '../models/Delivery';

class ProblemController {
    async index(req, res) {
        const { delivery_id } = req.params;

        if (delivery_id) {
            const problems = await Problem.findAll({
                where: {
                    delivery_id,
                },
                include: [
                    {
                        model: Delivery,
                        attributes: ['product'],
                    },
                ],
            });
            return res.json(problems);
        }

        const problems = await Problem.findAll({
            include: [
                {
                    model: Delivery,
                    attributes: ['id', 'product'],
                },
            ],
        });

        return res.json(problems);
    }

    async store(req, res) {
        const { description } = req.body;
        const { id } = req.params;

        const delivery = await Delivery.findByPk(id);
        if (!delivery) {
            return res.status(400).json({ error: 'Invalid delivery id' });
        }

        if (delivery.end_date || delivery.canceled_at) {
            return res.status(401).json({
                error: "You can't register problems to this delivery anymore. ",
            });
        }

        const problem = await Problem.create({
            delivery_id: Number(id),
            description,
        });

        return res.json(problem);
    }

    async show(req, res) {
        const { id } = req.params;

        const problem = await Problem.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Delivery,
                    attributes: ['product'],
                },
            ],
        });

        if (!problem) {
            return res.json({ err: 'Invalid problem id provided.' });
        }

        return res.json(problem);
    }
}
export default new ProblemController();
