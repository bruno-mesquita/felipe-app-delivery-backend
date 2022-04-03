import { Router } from 'express';

import { FreightController } from './FreightController';
import middlewares from '../../http/middlewares';

const routes = Router();
const freightController = new FreightController();

routes.post('/freights', ...middlewares, freightController.create);
routes.put('/freights/:id', ...middlewares, freightController.update);
routes.delete('/freights/:id', ...middlewares, freightController.delete);
routes.get('/freights', ...middlewares, freightController.list);

export default routes;
