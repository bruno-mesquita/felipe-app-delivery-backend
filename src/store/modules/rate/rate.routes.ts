import { Router } from 'express';

import { RateController } from './rate.controller';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import isAuthenticated from '@shared/middlewares/is-authenticated';

const routes = Router();
const rateController = new RateController();

routes.get('/list-rates', isAuthenticated, accessEstablishmentOwner, rateController.listRates);

export default routes;
