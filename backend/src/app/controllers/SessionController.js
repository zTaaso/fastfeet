import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email.' });
        }

        if (!user.checkPassword(password)) {
            return res.status(400).json({ error: 'Invalid password.' });
        }

        const { name } = user;

        return res.json({
            name,
            email,
            token: jwt.sign({ email }, authConfig.secret, {
                expiresIn: authConfig.expires,
            }),
        });
    }
}

export default new SessionController();
