import * as Yup from 'yup';

class RecipientValidator {
    async store(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            number: Yup.number().required(),
            street: Yup.string().required(),
            complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip: Yup.string().required().min(8),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ err: 'Validation failed.' });
        }

        return next();
    }
}

export default new RecipientValidator();
