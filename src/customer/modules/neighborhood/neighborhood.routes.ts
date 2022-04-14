import { Router } from 'express';

import middlewares from '@customer/http/middlewares';
import { NeighborhoodController } from './neighborhood.controller';

const routes = Router();
const neighborhoodController = new NeighborhoodController();

routes.get('/neighborhoods', ...middlewares, neighborhoodController.list);

export default routes;