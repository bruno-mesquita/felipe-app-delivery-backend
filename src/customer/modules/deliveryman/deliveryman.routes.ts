import { Router } from 'express';

import { accessClient } from '@shared/middlewares/access-client';
import isAuthenticated from '@shared/middlewares/is-authenticated';
import { DeliverymanController } from './deliveryman.controller';

const routes = Router();
const deliverymanController = new DeliverymanController();

routes.get('/deliverymen', isAuthenticated, accessClient, deliverymanController.list);

export default routes;
