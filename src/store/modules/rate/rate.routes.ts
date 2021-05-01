import { Router } from 'express';

import { RateController } from './rate.controller';

const routes = Router();
const rateController = new RateController();

export default routes;
