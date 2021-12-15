import { Router } from 'express';

import middlewares from '@admin/http/middlewares';
import { CityController } from './city.controller';

const cityController = new CityController();

const routes = Router();

routes.post('/cities', ...middlewares, cityController.create);
routes.put('/cities/:id', ...middlewares, cityController.update);
routes.get('/cities', ...middlewares, cityController.list);
routes.get('/cities/:stateId', ...middlewares, cityController.list);

export default routes;
