import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
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
}

export default new RecipientController();
