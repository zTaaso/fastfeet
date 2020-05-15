import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ err: 'Token was not provided.' });
    }
    const [, token] = authHeader.split(' ');

    try {
        jwt.verify(token, authConfig.secret);

        return next();
    } catch (err) {
        return res.status(403).json({ err: 'Invalid token.' });
    }
};
