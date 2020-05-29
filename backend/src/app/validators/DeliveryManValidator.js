import * as Yup from 'yup';

class DeliveryManValidator {
    async store(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ err: 'Validation failed.' });
        }

        return next();
    }

    async delete(req, res, next) {
        const { id } = req.params;

        const schema = Yup.number().required();

        if (!(await schema.isValid(id))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        return next();
    }

    async update(req, res, next) {
        const idSchema = Yup.number().required();
        const bodySchema = Yup.object().shape({
            name: Yup.string().max(20),
            email: Yup.string().email(),
        });

        const [bodyValid, idValid] = await Promise.all([
            bodySchema.isValid(req.body),
            idSchema.isValid(req.params.id),
        ]);

        if (!(bodyValid && idValid)) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        return next();
    }
}

export default new DeliveryManValidator();
