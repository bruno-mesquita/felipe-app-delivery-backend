import { Router } from 'express';

import { accessAdmin } from '@shared/middlewares/access-admin';
import isAuthenticated from '@shared/middlewares/is-authenticated';
import { CityController } from './city.controller';

const cityController = new CityController();

const routes = Router();

routes.post('/cities', isAuthenticated, accessAdmin, cityController.create);
routes.put('/cities/:id', isAuthenticated, accessAdmin, cityController.update);
routes.get('/cities', isAuthenticated, accessAdmin, cityController.list);
routes.get('/cities/:stateId', isAuthenticated, accessAdmin, cityController.list);

export default routes;
