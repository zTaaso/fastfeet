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
}

export default new RecipientController();
