import { Router } from 'express';
import { StateController } from './state.controller';

import middlewares from '@admin/http/middlewares';

const stateController = new StateController();

const routes = Router();

routes.post('/states', ...middlewares, stateController.create);
routes.get('/states', ...middlewares, stateController.list);
routes.put('/states/:id', ...middlewares, stateController.update);
routes.get('/states/:stateId/cities', ...middlewares, stateController.listByState);

export default  routes;
