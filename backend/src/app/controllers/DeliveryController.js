import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryController {
    async index(_, res) {
        const deliveries = await Delivery.findAll();

        return res.json(deliveries);
    }

    async store(req, res) {
        const { recipient_id, deliveryman_id, product } = req.body;

        const recipient = await Recipient.findByPk(recipient_id);
        if (!recipient) {
            return res
                .status(400)
                .json({ error: 'Recipient id is not valid.' });
        }

        const deliveryman = await DeliveryMan.findByPk(deliveryman_id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Delivery man id is not valid.' });
        }

        const delivery = await Delivery.create({
            recipient_id,
            deliveryman_id,
            product,
        });

        return res.json(delivery);
    }
}

export default new DeliveryController();
