import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader.split(' ');

    try {
        jwt.verify(token, authConfig.secret);

        return next();
    } catch (err) {
        return res.status(403).json({ err: 'Invalid token.' });
    }
};
