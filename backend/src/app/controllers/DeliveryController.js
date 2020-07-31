import { fn, where, col, Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import Problem from '../models/Problem';

import transporter from '../../config/mail';
import FileModel from '../models/File';

class DeliveryController {
    async index(req, res) {
        const { q: query, withProblem } = req.query;

        const deliveries = await Delivery.findAll({
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['id', 'name', 'city', 'state'],
                },
                {
                    model: Problem,
                    as: 'problem',
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
            where: query && {
                product: where(
                    fn('LOWER', col('product')),
                    'LIKE',
                    `%${query.toLowerCase()}%`
                ),
            },
        });

        if (withProblem === 'true') {
            const deliveriesWithProblems = deliveries.filter(
                (delivery) => !!delivery.problem
            );
            return res.json(deliveriesWithProblems);
        }

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
        const { destroy } = req.query;

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

        if (destroy === 'true') {
            await delivery.destroy();
            return res.json({ success: 'Delivery succesfully deleted.' });
        }

        if (delivery.canceled_at) {
            return res
                .status(400)
                .json({ err: 'This delivery is alredy canceled.' });
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

        const delivery = await Delivery.findByPk(id, {
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    // attributes: ['id', 'name', 'city', 'state'],
                },
                {
                    model: DeliveryMan,
                    as: 'deliveryman',

                    attributes: ['id', 'name'],
                },
            ],
        });
        if (!delivery) {
            return res.status(401).json({ error: 'Delivery not found.' });
        }

        return res.json(delivery);
    }
}

export default new DeliveryController();
