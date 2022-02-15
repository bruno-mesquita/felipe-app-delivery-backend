import { Router } from 'express';

import StateController from './state.controller';

const routes = Router();
const stateController = new StateController();

routes.get('/states', stateController.list);
routes.get('/states/:stateId/cities', stateController.listCities);

export default routes;
