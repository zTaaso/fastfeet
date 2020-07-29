import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
        const { q: query } = req.query;

        if (query) {
            const recipients = await Recipient.findAll({
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
                where: {
                    name: {
                        [Op.substring]: query,
                    },
                },
            });

            return res.json(recipients);
        }

        const recipients = await Recipient.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt'],
            },
        });

        return res.json(recipients);
    }

    async store(req, res) {
        const { name, id } = await Recipient.create(req.body);

        return res.json({
            name,
            id,
        });
    }

    async delete(req, res) {
        const { id } = req.params;

        const recipient = await Recipient.findByPk(id);
        await recipient.destroy();

        const { id: recipient_id, name } = recipient;

        return res.json({ id: recipient_id, name });
    }

    async update(req, res) {
        const { id } = req.params;

        const recipient = await Recipient.findByPk(id);

        await recipient.update(req.body);
        return res.json(recipient);
    }

    async show(req, res) {
        const { id } = req.params;

        const recipient = await Recipient.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if (!recipient) {
            return res.status(401).json({ error: 'Recipient not found.' });
        }

        return res.json(recipient);
    }
}

export default new RecipientController();
