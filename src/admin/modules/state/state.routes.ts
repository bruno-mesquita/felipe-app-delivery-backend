import { Router } from 'express';
import { StateController } from './state.controller';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessAdmin } from '@shared/middlewares/access-admin';

const stateController = new StateController();

const routes = Router();

routes.post('/states', isAuthenticated, accessAdmin, stateController.create);
routes.get('/states', isAuthenticated, accessAdmin, stateController.list);
routes.put('/states/:id', isAuthenticated, accessAdmin, stateController.update);

export default  routes;
