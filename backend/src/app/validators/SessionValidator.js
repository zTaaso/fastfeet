import * as Yup from 'yup';

class SessionValidator {
    async store(req, res, next) {
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ err: 'Validation fails.' });
        }

        return next();
    }
}

export default new SessionValidator();
