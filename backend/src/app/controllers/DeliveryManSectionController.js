import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';

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

        if (isCanceled) {
            parsedDeliveries = deliveries.filter(
                (delivery) => delivery.canceled_at !== null
            );
        }

        return res.json(parsedDeliveries);
    }
}

export default new DeliveryManSectionController();
