import { Router } from 'express';
import { StateController } from './state.controller';

const stateController = new StateController();

const routes = Router();

routes.post('/states', stateController.create);
routes.get('/states', stateController.list);
routes.put('/states/:id', stateController.update);
routes.get('/states/:id/cities', stateController.listCities);

export default  routes
