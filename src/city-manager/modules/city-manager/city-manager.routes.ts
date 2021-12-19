import { Router } from 'express';

import middlewares from '../../http/middlewares';
import { CityManagerController } from './city-manager.controller';

const cityManagerController = new CityManagerController();

const routes = Router();

routes.post('/city-managers/me', ...middlewares, cityManagerController.me);

export default routes;
