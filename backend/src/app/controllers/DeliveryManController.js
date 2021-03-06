import { fn, where, col } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import FileModel from '../models/File';

class DeliveryManController {
    async index(req, res) {
        const { q: query } = req.query;

        const deliveryMen = await DeliveryMan.findAll({
            include: [
                { model: FileModel, as: 'avatar', attributes: ['url', 'path'] },
            ],
            where: query && {
                product: where(
                    fn('LOWER', col('DeliveryMan.name')),
                    'LIKE',
                    `%${query.toLowerCase()}%`
                ),
            },
        });
        return res.json(deliveryMen);
    }

    async store(req, res) {
        const deliveryMan = await DeliveryMan.create(req.body);

        return res.json(deliveryMan);
    }

    async update(req, res) {
        const { id } = req.params;
        const { avatar_id } = req.body;

        const deliveryman = await DeliveryMan.findByPk(id);
        if (!deliveryman) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        const avatar = await FileModel.findByPk(avatar_id);
        if (avatar && !avatar) {
            return res.status(400).json({ error: 'Invalid avatar id' });
        }

        await deliveryman.update(req.body);

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

    async show(req, res) {
        const { id } = req.params;

        const deliveryman = await DeliveryMan.findByPk(id, {
            include: [
                {
                    model: FileModel,
                    as: 'avatar',
                    attributes: ['url', 'path'],
                },
            ],
        });
        if (!deliveryman) {
            return res.status(401).json({ error: 'Delivery man not found.' });
        }

        return res.json(deliveryman);
    }
}

export default new DeliveryManController();
