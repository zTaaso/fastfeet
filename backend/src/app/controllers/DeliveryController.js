import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';

import transporter from '../../config/mail';
import FileModel from '../models/File';

class DeliveryController {
    async index(req, res) {
        const { q: query } = req.query;

        if (query) {
            const deliveries = await Delivery.findAll({
                where: {
                    product: {
                        [Op.substring]: query,
                    },
                },
            });
            return res.json(deliveries);
        }

        const deliveries = await Delivery.findAll({
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['id', 'name', 'city', 'state'],
                },
                {
                    model: DeliveryMan,
                    as: 'deliveryman',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: FileModel,
                            as: 'avatar',
                            attributes: ['id', 'url', 'path'],
                        },
                    ],
                },
            ],
            attributes: ['id'],
        });

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

        const delivery = await Delivery.findByPk(id, {
            include: [
                {
                    model: DeliveryMan,
                    attributes: ['email', 'name'],
                    as: 'deliveryman',
                },
            ],
        });
        if (!delivery) {
            return res
                .status(400)
                .json({ error: 'This delivery does not exists.' });
        }

        delivery.canceled_at = new Date();
        await delivery.save();

        transporter.sendMail({
            to: delivery.deliveryman.email,
            subject: 'Nova encomenda cancelada',
            text: `Olá ${delivery.deliveryman.name}! Uma entrega atribuída a você foi cancelada.`,
            html: `<p> A entrega do produto <b>"${delivery.product}"</b> foi cancelada e não está mais disponível para a retirada. </p>`,
        });

        return res.json(delivery);
    }

    async show(req, res) {
        const { id } = req.params;

        const delivery = await Delivery.findByPk(id);
        if (!delivery) {
            return res.status(401).json({ error: 'Delivery not found.' });
        }

        return res.json(delivery);
    }
}

export default new DeliveryController();
