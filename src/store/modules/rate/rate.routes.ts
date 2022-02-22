import { Router } from 'express';

import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import isAuthenticated from '@shared/middlewares/is-authenticated';
import { RateController } from './rate.controller';

const routes = Router();
const rateController = new RateController();

routes.get(
  '/list-rates',
  isAuthenticated,
  accessEstablishmentOwner,
  rateController.listRates
);

export default routes;
