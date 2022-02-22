import { Router } from 'express';

import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import isAuthenticated from '@shared/middlewares/is-authenticated';
import { DeliverymanController } from './deliveryman.controller';

const routes = Router();
const deliverymanController = new DeliverymanController();

routes.get(
  '/deliverymen',
  isAuthenticated,
  accessEstablishmentOwner,
  deliverymanController.list
);

export default routes;
