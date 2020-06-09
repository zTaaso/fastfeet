import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import RecipientValidator from './app/validators/RecipientValidator';
import SessionValidator from './app/validators/SessionValidator';

import authMiddleware from './app/middlewares/auth';
import DeliveryManValidator from './app/validators/DeliveryManValidator';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryManSectionController from './app/controllers/DeliveryManSectionController';

const routes = Router();

routes.post('/sessions', SessionValidator.store, SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliveryManSectionController.index);

routes.use(authMiddleware);

routes.post('/recipients', RecipientValidator.store, RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliveryman', DeliveryManController.index);
routes.post(
    '/deliveryman',
    DeliveryManValidator.store,
    DeliveryManController.store
);
routes.put(
    '/deliveryman/:id',
    DeliveryManValidator.update,
    DeliveryManController.update
);
routes.delete(
    '/deliveryman/:id',
    DeliveryManValidator.delete,
    DeliveryManController.delete
);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
