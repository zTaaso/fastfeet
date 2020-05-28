import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import RecipientValidator from './app/validators/RecipientValidator';
import SessionValidator from './app/validators/SessionValidator';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionValidator.store, SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientValidator.store, RecipientController.store);
routes.get('/recipients', RecipientController.index);

export default routes;
