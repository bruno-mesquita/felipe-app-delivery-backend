import { Router } from 'express';

import middlewares from '@admin/http/middlewares';
import { DeliverymanController } from './deliveryman.controller';

const routes = Router();
const deliverymanController = new DeliverymanController();

routes.get('/deliverymen', ...middlewares, deliverymanController.list);
routes.post('/deliverymen', ...middlewares, deliverymanController.post);
routes.put('/deliverymen/:id', ...middlewares, deliverymanController.put);
routes.delete('/deliverymen/:id', ...middlewares, deliverymanController.delete);

export default routes;
