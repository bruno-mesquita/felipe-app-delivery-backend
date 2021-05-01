import { Router } from 'express';

import { RateController } from './rate.controller';

const routes = Router();
const rateController = new RateController();

routes.get('/list-rates', rateController.listRates);

export default routes;
