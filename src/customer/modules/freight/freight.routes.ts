import { Router } from 'express';

import { FreightController } from './FreightController';

const routes = Router();
const freightController = new FreightController();

routes.get('/freights', freightController.list);

export default routes;
