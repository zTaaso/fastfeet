import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) =>
    res.json({ message: 'pau no cu de que tá lendo' })
);

export default routes;
