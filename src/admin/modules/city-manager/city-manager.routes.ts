import { Router } from 'express';

import middlewares from '@admin/http/middlewares';
import { CityManagerController } from './city-manager.controller';

const routes = Router();
const cityManagerController = new CityManagerController();

routes.post('/city-managers', ...middlewares, cityManagerController.create);
routes.get('/city-managers', ...middlewares, cityManagerController.list);
routes.delete('/city-managers/:id', ...middlewares, cityManagerController.destroy);
routes.put('/city-managers/:id', ...middlewares, cityManagerController.update);

export default routes;
