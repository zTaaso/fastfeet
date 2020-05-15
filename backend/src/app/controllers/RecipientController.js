import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const recipient = await Recipient.create(req.body);

        return res.json(recipient);
    }

    async index(req, res) {
        const recipients = await Recipient.findAll();

        return res.json(recipients);
    }
}

export default new RecipientController();
