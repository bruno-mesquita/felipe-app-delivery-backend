import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessAdmin } from '@shared/middlewares/access-admin';
import { DeliverymanController } from './deliveryman.controller';

const routes = Router();
const deliverymanController = new DeliverymanController();

routes.get('/deliverymen', isAuthenticated, accessAdmin, deliverymanController.list);
routes.post('/deliverymen', isAuthenticated, accessAdmin, deliverymanController.post);
routes.put('/deliverymen/:id', isAuthenticated, accessAdmin, deliverymanController.put);
routes.delete('/deliverymen/:id', isAuthenticated, accessAdmin, deliverymanController.delete);

export default routes;
