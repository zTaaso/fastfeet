import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.get('/user', UserController.read);
routes.post('/session', SessionController.store);

routes.post('/recipient', RecipientController.store);
routes.get('/recipient', authMiddleware, RecipientController.index);

export default routes;
