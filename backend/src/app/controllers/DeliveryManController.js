import DeliveryMan from '../models/DeliveryMan';

class DeliveryManController {
    async index(_, res) {
        const deliveryMen = await DeliveryMan.findAll();
        return res.json(deliveryMen);
    }

    async store(req, res) {
        const { name, email } = req.body;

        const deliveryMan = await DeliveryMan.create({
            name,
            email,
        });

        return res.json(deliveryMan);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;

        const deliveryman = await DeliveryMan.findByPk(id);

        if (!deliveryman) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        await deliveryman.update({
            name,
            email,
        });

        return res.json(deliveryman);
    }

    async delete(req, res) {
        const { id } = req.params;

        const deliveryman = await DeliveryMan.findByPk(id);

        if (!deliveryman) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        deliveryman.destroy();

        return res.json(deliveryman);
    }
}

export default new DeliveryManController();
