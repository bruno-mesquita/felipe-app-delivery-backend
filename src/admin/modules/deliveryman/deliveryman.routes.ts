import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessAdmin } from '@shared/middlewares/access-admin';
import { DeliverymanController } from './deliveryman.controller';

const routes = Router();
const deliverymanController = new DeliverymanController();

const auth = [isAuthenticated, accessAdmin];

routes.get('/deliverymen', ...auth, deliverymanController.list);
routes.post('/deliverymen', ...auth, deliverymanController.post);
routes.put('/deliverymen/:id', ...auth, deliverymanController.put);
routes.delete('/deliverymen/:id', ...auth, deliverymanController.delete);

export default routes;
