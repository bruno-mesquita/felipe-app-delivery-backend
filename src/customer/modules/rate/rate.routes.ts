import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import RateController from './rate.controller';

const routes = Router();
const rateController = new RateController();

const middlewares = [isAuthenticated, accessClient];

routes.get('/rates/:id', ...middlewares, rateController.findOne);
routes.post('/rates', ...middlewares, rateController.create);

export default routes;
