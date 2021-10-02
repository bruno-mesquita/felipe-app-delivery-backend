import { Router } from 'express';

import { CityManagerController } from './city-manager.controller';

const cityManagerController = new CityManagerController();

const routes = Router();

routes.post('/city-managers/me', cityManagerController.me);

export default routes;
