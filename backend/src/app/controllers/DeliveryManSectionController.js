import { startOfToday, endOfToday } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManSectionController {
    async index(req, res) {
        const { id } = req.params;
        const { delivered, canceled, all } = req.query;
        const isDelivered = delivered === 'true';
        const isCanceled = canceled === 'true';
        const isAll = all === 'true';

        const deliveryman = await DeliveryMan.findByPk(id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Requested Delivery man does not exist.' });
        }

        const deliveries = await Delivery.findAll({
            where: {
                deliveryman_id: id,
            },
        });

        if (isAll) {
            return res.json(deliveries);
        }

        // by default, are returned deliveries which was not canceled or delivered
        let parsedDeliveries = deliveries.filter(
            (delivery) =>
                delivery.canceled_at === null && delivery.end_date === null
        );

        // if delivered filter is passed
        if (isDelivered) {
            parsedDeliveries = deliveries.filter(
                (delivery) => delivery.end_date !== null
            );
        }

        // if canceled filter is passed
        if (isCanceled) {
            parsedDeliveries = deliveries.filter(
                (delivery) => delivery.canceled_at !== null
            );
        }

        return res.json(parsedDeliveries);
    }

    async update(req, res) {
        const { start_date, end_date, signature_id } = req.body;
        const { deliverymanId, deliveryId } = req.params;

        const deliveryman = await DeliveryMan.findByPk(deliverymanId);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Requested Deliveryman does not exist.' });
        }

        const delivery = await Delivery.findOne({
            where: {
                id: deliveryId,
                deliveryman_id: deliverymanId,
            },
        });
        if (!delivery) {
            return res
                .status(400)
                .json({ error: 'Requested Delivery does not exist.' });
        }

        const signature = await File.findByPk(signature_id);
        if (!signature) {
            return res.status(400).json({ error: 'Invalid signature id.' });
        }

        if (start_date) {
            const deliveriesOfDay = await Delivery.findAndCountAll({
                where: {
                    deliveryman_id: deliverymanId,
                    start_date: {
                        [Op.between]: [startOfToday(), endOfToday()],
                    },
                },
            });

            if (deliveriesOfDay.count >= 5) {
                return res.status(401).json({
                    error: 'You can not deliver more than 5 deliveries a day ',
                });
            }
        }

        await delivery.update({
            start_date,
            end_date,
            signature_id,
        });

        return res.json({ delivery });
    }
}

export default new DeliveryManSectionController();
