import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessAdmin } from '@shared/middlewares/access-admin';
import { CityManagerController } from './city-manager.controller';

const routes = Router();
const cityManagerController = new CityManagerController();

routes.post('/city-managers', isAuthenticated, accessAdmin, cityManagerController.create);
routes.get('/city-managers/:id', isAuthenticated, accessAdmin, cityManagerController.show);
routes.get('/city-managers', isAuthenticated, accessAdmin, cityManagerController.list);
routes.delete('/city-managers/:id', isAuthenticated, accessAdmin, cityManagerController.destroy);
routes.put('/city-managers/:id', isAuthenticated, accessAdmin, cityManagerController.update);

export default routes;
