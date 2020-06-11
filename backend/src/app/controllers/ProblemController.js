import Problem from '../models/Problem';
import Delivery from '../models/Delivery';

class ProblemController {
    async index(_, res) {
        const deliveriesWithProblems = await Problem.findAll({
            include: [
                {
                    model: Delivery,
                    attributes: ['id', 'product'],
                },
            ],
        });

        return res.json(deliveriesWithProblems);
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

        const delivery = await Delivery.findByPk(id);
        if (!delivery) {
            return res.status(400).json({ error: 'Invalid id provided' });
        }

        const problems = await Problem.findAll({
            where: {
                delivery_id: id,
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
}
export default new ProblemController();
