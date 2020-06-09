import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';

import transporter from '../../config/mail';

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

        transporter.sendMail({
            to: deliveryman.email,
            subject: 'Nova encomenda cadastrada!',
            text: 'Você possui uma nova entrega já disponível para retirada.',
            html: `<p> O produto <b>"${delivery.product}"</b> foi cadastrado e está disponível para retirada. </p>`,
        });

        return res.json(delivery);
    }

    async update(req, res) {
        const { id } = req.params;

        const delivery = await Delivery.findByPk(id);
        if (!delivery) {
            return res
                .status(400)
                .json({ error: 'This delivery does not exists.' });
        }

        await delivery.update(req.body);

        return res.json(delivery);
    }

    async delete(req, res) {
        const { id } = req.params;

        const delivery = await Delivery.findByPk(id);
        if (!delivery) {
            return res
                .status(400)
                .json({ error: 'This delivery does not exists.' });
        }

        delivery.canceled_at = new Date();
        await delivery.save();

        return res.json(delivery);
    }
}

export default new DeliveryController();
