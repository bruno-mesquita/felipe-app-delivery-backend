import { Router } from 'express';

import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import { DeliverymanController } from './deliveryman.controller';

const routes = Router();
const deliverymanController = new DeliverymanController();

routes.get('/deliverymen', accessEstablishmentOwner, deliverymanController.list);

export default routes;
