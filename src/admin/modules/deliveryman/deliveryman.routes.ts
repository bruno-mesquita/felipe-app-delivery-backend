import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { DeliverymanController } from './deliveryman.controller';

const routes = Router();
const deliverymanController = new DeliverymanController();

routes.get('/deliverymen', isAuthenticated, deliverymanController.list);
routes.post('/deliverymen', isAuthenticated, deliverymanController.post);
routes.put('/deliverymen/:id', isAuthenticated, deliverymanController.put);
routes.delete('/deliverymen/:id', isAuthenticated, deliverymanController.delete);

export default routes;
