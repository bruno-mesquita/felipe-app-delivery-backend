import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { DeliverymanController } from './deliveryman.controller';

const routes = Router();
const deliverymanController = new DeliverymanController();

routes.get('/deliverymen', isAuthenticated, deliverymanController.list);

export default routes;
